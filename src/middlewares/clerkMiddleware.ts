import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/buy", "/success", "/error", "/about", "/contact"],
});
