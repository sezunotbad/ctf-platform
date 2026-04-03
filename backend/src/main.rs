use axum::{
    extract::State,
    http::{Method, StatusCode},
    routing::{get, post},
    Json, Router,
};
use bcrypt::{hash, verify, DEFAULT_COST};
use chrono::{Duration, Utc};
use jsonwebtoken::{encode, EncodingKey, Header};
use serde::{Deserialize, Serialize};
use sqlx::{
    sqlite::{SqliteConnectOptions, SqlitePoolOptions},
    FromRow, SqlitePool,
};
use std::net::SocketAddr;
use std::str::FromStr;
use tower_http::cors::{Any, CorsLayer};

// --- BÍ MẬT JWT ---
const JWT_SECRET: &[u8] = b"vsl_super_secret_key_2026";

#[derive(Deserialize)]
struct AuthPayload {
    username: String,
    password: String,
}

#[derive(Serialize, FromRow)]
struct User {
    id: i64,
    username: String,
    password_hash: String,
}

#[derive(Serialize)]
struct ResponseMsg {
    message: String,
    error: Option<String>,
}

#[derive(Serialize)]
struct LoginResponse {
    message: String,
    token: String,
    data: Option<User>,
}

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: String, // Tên user
    exp: usize,  // Thời gian hết hạn
}

#[derive(Serialize)]
struct Challenge {
    id: i32,
    title: String,
    category: String,
    points: i32,
    solves: i32,
    #[serde(rename = "isSolved")]
    is_solved: bool,
}

// --- MAIN ---
#[tokio::main]
async fn main() {
    let options = SqliteConnectOptions::from_str("sqlite://ctf_database.db")
        .unwrap()
        .create_if_missing(true);

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect_with(options)
        .await
        .expect("Không thể kết nối tới SQLite");

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )",
    )
    .execute(&pool)
    .await
    .expect("Lỗi khi tạo bảng users");

    let cors = CorsLayer::new()
        .allow_methods([Method::GET, Method::POST])
        .allow_origin(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/api/auth/register", post(register))
        .route("/api/auth/login", post(login))
        .route("/api/challenges", get(get_challenges))
        .with_state(pool)
        .layer(cors);

    let addr = SocketAddr::from(([0, 0, 0, 0], 5000));
    println!("Backend Rust (Bcrypt + JWT) đang chạy tại http://{}", addr);

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// --- API IMPLEMENTATION ---

async fn register(
    State(pool): State<SqlitePool>,
    Json(payload): Json<AuthPayload>,
) -> Result<(StatusCode, Json<ResponseMsg>), (StatusCode, Json<ResponseMsg>)> {
    // 1. Dùng BCRYPT để băm mật khẩu
    let hashed_password = hash(payload.password.as_bytes(), DEFAULT_COST).map_err(|_| {
        (
            StatusCode::INTERNAL_SERVER_ERROR,
            Json(ResponseMsg { message: "Lỗi!".to_string(), error: Some("Lỗi hash".to_string()) }),
        )
    })?;

    let insert_result = sqlx::query("INSERT INTO users (username, password_hash) VALUES (?, ?)")
        .bind(&payload.username)
        .bind(&hashed_password)
        .execute(&pool)
        .await;

    match insert_result {
        Ok(_) => Ok((
            StatusCode::CREATED,
            Json(ResponseMsg { message: "Đăng ký thành công!".to_string(), error: None }),
        )),
        Err(_) => Err((
            StatusCode::BAD_REQUEST,
            Json(ResponseMsg { message: "Lỗi!".to_string(), error: Some("User đã tồn tại!".to_string()) }),
        )),
    }
}

async fn login(
    State(pool): State<SqlitePool>,
    Json(payload): Json<AuthPayload>,
) -> Result<(StatusCode, Json<LoginResponse>), (StatusCode, Json<ResponseMsg>)> {
    // Vẫn cố tình để lỗ hổng SQL Injection ở bước tìm Username
    let vulnerable_query = format!(
        "SELECT id, username, password_hash FROM users WHERE username = '{}'",
        payload.username
    );

    println!("Query Login: {}", vulnerable_query);

    let user_opt = sqlx::query_as::<_, User>(&vulnerable_query)
        .fetch_optional(&pool)
        .await
        .map_err(|_| {
            (
                StatusCode::INTERNAL_SERVER_ERROR,
                Json(ResponseMsg { message: "Lỗi server".to_string(), error: Some("Lỗi DB".to_string()) }),
            )
        })?;

    if let Some(user) = user_opt {
        // 2. Dùng BCRYPT để xác thực mật khẩu
        let is_valid = verify(payload.password.as_bytes(), &user.password_hash).unwrap_or(false);

        if is_valid {
            // 3. Tạo JWT TOKEN THẬT
            let expiration = Utc::now()
                .checked_add_signed(Duration::hours(2))
                .expect("Lỗi tính thời gian")
                .timestamp() as usize;

            let claims = Claims {
                sub: user.username.clone(),
                exp: expiration,
            };

            let token = encode(
                &Header::default(),
                &claims,
                &EncodingKey::from_secret(JWT_SECRET),
            )
            .unwrap();

            return Ok((
                StatusCode::OK,
                Json(LoginResponse {
                    message: "Đăng nhập thành công".to_string(),
                    token,
                    data: Some(user),
                }),
            ));
        }
    }

    Err((
        StatusCode::UNAUTHORIZED,
        Json(ResponseMsg { message: "Thất bại".to_string(), error: Some("Sai tài khoản hoặc mật khẩu.".to_string()) }),
    ))
}

async fn get_challenges() -> Json<Vec<Challenge>> {
    let challenges = vec![
        Challenge {
            id: 1,
            title: "Bypass me if you can".to_string(),
            category: "web".to_string(),
            points: 100,
            solves: 10,
            is_solved: false,
        },
    ];
    Json(challenges)
}