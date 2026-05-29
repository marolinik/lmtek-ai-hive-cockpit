import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { CockpitShell } from "@/components/CockpitShell";
import Configurator from "@/pages/configurator";
import Portfolio from "@/pages/portfolio";
import ProductPages from "@/pages/products";
import Tco from "@/pages/tco";
import Partners from "@/pages/partners";
import SiteStructure from "@/pages/site-structure";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Configurator} />
      <Route path="/configurator" component={Configurator} />
      <Route path="/portfolio" component={Portfolio} />
      <Route path="/products" component={ProductPages} />
      <Route path="/tco" component={Tco} />
      <Route path="/partners" component={Partners} />
      <Route path="/site-structure" component={SiteStructure} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router hook={useHashLocation}>
          <CockpitShell>
            <AppRouter />
          </CockpitShell>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
