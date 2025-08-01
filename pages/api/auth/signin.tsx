import { getCsrfToken } from "next-auth/react";

export default function SignIn({ csrfToken }: { csrfToken: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f8f9fa",
      }}
    >
      <form
        method="post"
        action="/api/auth/callback/credentials"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background: "#fff",
          padding: "30px",
          borderRadius: "10px",
          width: "300px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>Login</h2>
        <label>Email</label>
        <input name="email" type="text" required />
        <label>Password</label>
        <input name="password" type="password" required />
        <button
          type="submit"
          style={{
            background: "#0070f3",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Sign in
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
