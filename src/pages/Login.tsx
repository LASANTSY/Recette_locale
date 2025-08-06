import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { mockUserData } from "../components/common/data/mockUserData";
import { useAuth } from "../context/auth";
import {
  Lock,
  ShieldCheck,
  Smartphone,
  CheckCircle,
  Users,
  AlertCircle,
  HelpCircle,
  Mail,
  ArrowRight,
  Loader2,
} from "lucide-react";

const featureList = [
  {
    icon: ShieldCheck,
    title: "Sécurité Renforcée",
    desc: "Protection avancée des données et authentification sécurisée",
  },
  {
    icon: Smartphone,
    title: "Interface Moderne",
    desc: "Design intuitif et responsive pour tout appareil",
  },
  {
    icon: CheckCircle,
    title: "Gestion Efficace",
    desc: "Outils simples pour optimiser votre quotidien",
  },
  {
    icon: Users,
    title: "Multi-utilisateurs",
    desc: "Accès personnalisé selon votre rôle",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const featureVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const getDefaultPathForRole = (role) => {
    switch (role) {
      case "Administrateur":
        return "/administrateur/tableau_de_bord";
      case "SuperAdministrateur":
        return "/superadmin";
      case "Caissier":
        return "/caissier";
      case "Maire":
        return "/maire";
      case "Ordonnateur":
        return "/ordonnateur";
      case "Percepteur":
        return "/percepteur";
      case "Tresorier":
        return "/tresorier";
      case "Contribuable":
        return "/contribuable";
      default:
        return "/";
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulation d'un délai de connexion
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const user = mockUserData.find((u) => u.email === email && u.password === password);
    if (user) {
      login(user);
      const from =
        location.state?.from?.pathname || getDefaultPathForRole(user.userRole);
      navigate(from, { replace: true });
    } else {
      setError("Email ou mot de passe incorrect");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col lg:flex-row bg-gray-50 overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 mx-auto mb-4"
              >
                <Loader2 className="w-12 h-12 text-[#098E00]" />
              </motion.div>
              <p className="text-[#098E00] font-medium">
                Connexion en cours...
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left panel - Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 bg-[#F8F8F8] px-8 py-8 flex items-center justify-center"
      >
        <div className="w-full max-w-lg">
          {/* Logo & title */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-baseline gap-3 mb-6">
              {/* <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-emerald-600 text-white rounded-xl -mt-1">
                <Lock className="w-6 h-6" />
              </motion.div> */}
              <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800 whitespace-nowrap" style={{fontSize: '48px'}}>
                Plateforme{" "}
                <span className="font-semibold text-[#00C21C]">
                  Municipale
                </span>
              </h1>
            </div>
            <p className="text-gray-400 text-base leading-relaxed">
              Votre espace de gestion administrative moderne et sécurisé.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10"
          >
            {featureList.map(({ icon: Icon, title, desc }, index) => (
              <motion.div
                key={title}
                variants={featureVariants}
                whileHover={{ y: -2 }}
                className="group cursor-pointer"
              >
                <div className="bg-white border border-gray-300 rounded-lg p-4 h-full transition-all duration-300 group-hover:bg-white">
                  <Icon className="w-6 h-6 text-[#00C21C] mb-3" />
                  <h3 className="text-base font-semibold text-gray-800 mb-2">
                    {title}
                  </h3>
                  <p className="text-[#5D5D5D] text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Footer info */}
          <motion.div
            variants={itemVariants}
            className="flex gap-6 text-[#00C21C] text-sm"
          >
            {[
              "Plateforme certifiée",
              "Disponible 24/7",
              "Support technique",
            ].map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00C21C]" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right panel - Login form */}
      <motion.div
        variants={formVariants}
        initial="hidden"
        animate="visible"
        className="flex-1 flex items-center justify-center px-8 py-8 bg-white"
      >
        <div className="w-full max-w-sm">
          <motion.div variants={itemVariants} className="text-center mb-8">
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-lg mb-4 mx-auto text-emerald-600"
            >
              <LogIn className="w-6 h-6" />
            </motion.div> */}
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Connexion
            </h2>
            <p className="text-gray-400 text-sm">
              Accédez à votre espace personnel
            </p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            onSubmit={handleLogin}
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <div className="space-y-4">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block mb-2 mx-1 text-sm font-medium text-gray-800 flex item-center gap-2"
                  >
                    {/* <Mail className="mt-[1px] w-4 h-4" /> */}
                    Adresse email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@email.com"
                      required
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-[50px] text-gray-500 placeholder-gray-400 bg-white focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-800 flex item-center gap-2"
                  >
                    {/* <Lock className="mt-[1px] w-4 h-4" /> */}
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-6 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={isLoading}
                      className="w-full pl-12 pr-4 py-3 border border-gray-400 rounded-[50px] text-gray-500 placeholder-gray-400 bg-white focus:outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 flex items-center gap-3 text-sm"
                >
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#098E00] hover:bg-[#008713] cursor-pointer text-white font-medium py-3 rounded-lg flex items-center justify-center gap-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                  Connexion...
                </>
              ) : (
                <>
                  Se connecter
                </>
              )}
            </motion.button>
          </motion.form>

          {/* Help */}
          <motion.div
            variants={itemVariants}
            className="mt-10 pt-6 border-t border-emerald-100 text-center"
          >
            <p className="mb-3 text-sm text-gray-600">
              Besoin d'assistance ?
            </p>
            <div className="flex justify-center gap-6 text-sm">
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="font-medium text-[#1d70b8] hover:text-[#003078] focus:text-[#4c2c92] flex items-center gap-2 transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                Guide
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                href="#"
                className="font-medium text-[#1d70b8] hover:text-[#003078] focus:text-[#4c2c92] flex items-center gap-2 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Support
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-6 text-center text-[#00C21C] text-xs"
          >
            © 2024 Plateforme Municipale. Tous droits réservés.
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;