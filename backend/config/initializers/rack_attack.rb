# Be sure to restart your server when you modify this file.

class Rack::Attack
  # Use Rails.cache for storing rate limit counts
  Rack::Attack.cache.store = Rails.cache

  ### Throttle configurations ###

  # 1. GET requests to /posts and /projects (DoS and Scraping prevention)
  # Limit to 60 requests per minute per IP address
  throttle("req/get_posts_and_projects/ip", limit: 60, period: 1.minute) do |req|
    if req.get? && (
      req.path == "/posts" || req.path.start_with?("/posts/") ||
      req.path == "/projects" || req.path.start_with?("/projects/")
    )
      req.ip
    end
  end

  # 2. Write requests (POST, PUT, PATCH, DELETE) to any endpoints (Brute Force prevention)
  # Protects against brute-forcing the ADMIN_API_TOKEN in authenticate_admin!
  # Limit to 10 write operations per minute per IP address
  throttle("req/admin_write/ip", limit: 10, period: 1.minute) do |req|
    if req.post? || req.put? || req.patch? || req.delete?
      # Exclude health check path "/up" just in case (though it is a GET, be safe)
      req.ip unless req.path == "/up"
    end
  end

  ### Custom response on Throttling ###

  # Return HTTP 429 Too Many Requests in standard JSON format
  self.throttled_responder = lambda do |request_env|
    match_data = request_env["rack.attack.match_data"]

    headers = {
      "Content-Type" => "application/json",
      "Retry-After" => match_data[:period].to_s
    }

    body = {
      error: "Too many requests. Please try again later.",
      retry_after_seconds: match_data[:period]
    }.to_json

    [429, headers, [body]]
  end
end
