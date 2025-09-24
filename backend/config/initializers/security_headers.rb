# Be sure to restart your server when you modify this file.

# Configure default headers to protect the application with security headers.
# This prevents Clickjacking, MIME-sniffing, Referrer leakage, and restricts browser features.
Rails.application.config.action_dispatch.default_headers = {
  "X-Frame-Options" => "DENY",
  "X-Content-Type-Options" => "nosniff",
  "X-XSS-Protection" => "0",
  "Referrer-Policy" => "strict-origin-when-cross-origin",
  "Permissions-Policy" => "camera=(), microphone=(), geolocation=(), browsing-topics=()"
}
