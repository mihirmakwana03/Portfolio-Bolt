/** Minimal typings for Supabase Edge (Deno) globals — IDE/tsc only; runtime uses jsr edge-runtime. */
declare namespace Deno {
  namespace env {
    function get(key: string): string | undefined;
  }
  function serve(
    handler: (request: Request) => Response | Promise<Response>
  ): void;
}
