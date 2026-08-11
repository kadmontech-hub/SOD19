// Session boundary for the future Supabase Auth milestone.
// The current public prototype intentionally runs without credentials.

export const sessionProvider = {
  async getSession() {
    const external = globalThis.__SOD_SESSION_PROVIDER__;
    if (external?.getSession) return external.getSession();
    return {
      authenticated: false,
      accessToken: null,
      syncEnabled: false,
      mode: 'guest',
    };
  },

  async getAccessToken() {
    const session = await this.getSession();
    return session?.accessToken || null;
  },
};
