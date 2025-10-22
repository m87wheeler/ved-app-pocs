import { ExpoConfig, ConfigContext } from "@expo/config";
import { version } from "./package.json";

const EAS_PROJECT_ID = "68d640eb-4329-44d9-8538-84e00e54f943";
const PROJECT_SLUG = "ved-poc-v1";
const OWNER = "m87wheeler";

// production values
const APP_NAME = "app-v1";
const BUNDLE_IDENTIFIER = "com.m87wheeler.vedpocv1";
const PACKAGE_NAME = "com.m87wheeler.vedpocv1";
const SCHEME = "appv1";
const ICON = "./assets/images/icon.png";
const ADAPTIVE_ICON = "./assets/images/android-icon-foreground.png";

enum AppEnvironment {
  DEVELOPMENT = "development",
  PREVIEW = "preview",
  PRODUCTION = "production",
}

export default ({ config }: ConfigContext): ExpoConfig => {
  console.log("⚙️ Building app for environment:", process.env.APP_ENV);

  const { name, bundleIdentifier, icon, adaptiveIcon, packageName, scheme } =
    getDynamicAppConfig(
      (process.env.APP_ENV as AppEnvironment) || AppEnvironment.DEVELOPMENT
    );

  return {
    ...config,
    name,
    slug: PROJECT_SLUG,
    version, // automatically bump version with `npm version patch`, `npm version minor` or `npm version major`.
    orientation: "portrait",
    icon,
    scheme,
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: adaptiveIcon,
        backgroundColor: "#FFFFFF",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: packageName,
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    updates: {
      url: `https://u.expo.dev/${EAS_PROJECT_ID}`,
    },
    runtimeVersion: {
      policy: "appVersion",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: EAS_PROJECT_ID,
      },
    },
    owner: OWNER,
  };
};

function getDynamicAppConfig(environment: AppEnvironment) {
  const isProd = environment === AppEnvironment.PRODUCTION;
  return {
    name: isProd ? APP_NAME : `${APP_NAME} ${environment}`,
    bundleIdentifier: isProd
      ? BUNDLE_IDENTIFIER
      : `${BUNDLE_IDENTIFIER}.${environment}`,
    packageName: isProd ? PACKAGE_NAME : `${PACKAGE_NAME}.${environment}`,
    icon: ICON,
    adaptiveIcon: ADAPTIVE_ICON,
    scheme: isProd ? SCHEME : `${SCHEME}-${environment}`,
  };
}
