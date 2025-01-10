<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Define allowed origins for CORS
        $allowedOrigins = [
            'http://localhost:3000',
            'https://example.com',
        ];

        // Check if the request's origin is in the allowed origins
        $origin = $request->headers->get('Origin');
        $isAllowedOrigin = in_array($origin, $allowedOrigins);

        // Handle preflight requests (OPTIONS method)
        if ($request->getMethod() === 'OPTIONS') {
            $response = response()->json('OK', 200);

            if ($isAllowedOrigin) {
                $this->setCorsHeaders($response, $origin);
            }

            return $response;
        }

        // Process the request and add CORS headers to the response
        $response = $next($request);

        if ($isAllowedOrigin) {
            $this->setCorsHeaders($response, $origin);
        }

        return $response;
    }

    /**
     * Set CORS headers on the response.
     *
     * @param  \Symfony\Component\HttpFoundation\Response  $response
     * @param  string  $origin
     * @return void
     */
    private function setCorsHeaders(Response $response, string $origin): void
    {
        $response->headers->set('Access-Control-Allow-Origin', $origin);
        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        $response->headers->set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');
    }
}
