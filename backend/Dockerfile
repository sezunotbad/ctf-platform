# ===== build =====
FROM rustlang/rust:nightly as builder

WORKDIR /app
COPY . .

RUN cargo build --release

# ===== runtime =====
FROM debian:bookworm-slim

WORKDIR /app
COPY --from=builder /app/target/release/backend .

CMD ["./backend"]