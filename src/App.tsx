import { useEffect, useRef } from "react";
import {
  ClerkProvider,
  SignIn,
  SignUp,
  Show,
  useClerk,
} from "@clerk/react";
import { shadcn } from "@clerk/themes";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  Router as WouterRouter,
} from "wouter";
import { QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { GloProvider } from "@/lib/GloContext";
import { Sidebar } from "@/components/layout/sidebar";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl:
      typeof window !== "undefined"
        ? `${window.location.origin}${basePath}/logo.svg`
        : `${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#b89cdc",
    colorForeground: "#3b2a55",
    colorMutedForeground: "#7a6e91",
    colorDanger: "#d97a8e",
    colorBackground: "#ffffff",
    colorInput: "#faf7fd",
    colorInputForeground: "#3b2a55",
    colorNeutral: "#e5dcf2",
    fontFamily: '"Inter", system-ui, sans-serif',
    borderRadius: "1rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox:
      "bg-white/95 backdrop-blur-xl rounded-3xl w-[440px] max-w-full overflow-hidden shadow-xl border border-white/60",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "font-serif text-2xl text-[#3b2a55]",
    headerSubtitle: "text-[#7a6e91]",
    socialButtonsBlockButtonText: "text-[#3b2a55] font-medium",
    formFieldLabel: "text-[#3b2a55] font-medium",
    footerActionLink: "text-[#7a5da8] hover:text-[#5a3d88] font-medium",
    footerActionText: "text-[#7a6e91]",
    dividerText: "text-[#7a6e91]",
    identityPreviewEditButton: "text-[#7a5da8]",
    formFieldSuccessText: "text-emerald-600",
    alertText: "text-[#3b2a55]",
    logoBox: "flex justify-center mb-2",
    logoImage: "h-10",
    socialButtonsBlockButton:
      "rounded-xl border border-[#e5dcf2] hover:bg-[#faf7fd]",
    formButtonPrimary:
      "rounded-xl bg-[#b89cdc] hover:bg-[#a989d0] text-white font-medium shadow-sm",
    formFieldInput:
      "rounded-xl border border-[#e5dcf2] bg-[#faf7fd] focus:border-[#b89cdc]",
    footerAction: "pt-2",
    dividerLine: "bg-[#e5dcf2]",
    alert: "rounded-xl border border-[#e5dcf2] bg-[#faf7fd]",
    otpCodeFieldInput:
      "rounded-xl border border-[#e5dcf2] bg-[#faf7fd] text-[#3b2a55]",
    formFieldRow: "space-y-1",
    main: "px-2",
  },
};

function AppShell() {
  return (
    <div className="min-h-[100dvh] flex w-full">
      <Sidebar />
      <main className="flex-1 md:ml-64 relative min-w-0">
        <Dashboard />
      </main>
    </div>
  );
}

function HomeRoute() {
  return (
    <>
      <Show when="signed-in">
        <GloProvider>
          <AppShell />
        </GloProvider>
      </Show>
      <Show when="signed-out">
        <Landing />
      </Show>
    </>
  );
}

function SignInPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-[#f5edfb] via-[#fdf6fa] to-[#eef0fb] px-4 py-10">
      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        signUpUrl={`${basePath}/sign-up`}
      />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-br from-[#f5edfb] via-[#fdf6fa] to-[#eef0fb] px-4 py-10">
      <SignUp
        routing="path"
        path={`${basePath}/sign-up`}
        signInUrl={`${basePath}/sign-in`}
      />
    </div>
  );
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prev = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsub = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (prev.current !== undefined && prev.current !== userId) {
        qc.clear();
      }
      prev.current = userId;
    });
    return unsub;
  }, [addListener, qc]);

  return null;
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();
  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "welcome back",
            subtitle: "sign in to keep glowing",
          },
        },
        signUp: {
          start: {
            title: "begin your glow",
            subtitle: "create your account to start tracking",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <Switch>
          <Route path="/sign-in/*?" component={SignInPage} />
          <Route path="/sign-up/*?" component={SignUpPage} />
          <Route path="/" component={HomeRoute} />
          <Route component={NotFound} />
        </Switch>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
