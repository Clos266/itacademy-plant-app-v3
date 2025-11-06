type AppConfigType = {
  name: string;
  github: {
    title: string;
    url: string;
  };
  author: {
    name: string;
    url: string;
  };
};

export const appConfig: AppConfigType = {
  name: import.meta.env.VITE_APP_NAME ?? "PlantApp",
  github: {
    title: "PlantApp",
    url: "https://github.com/Clos266/itacademy-plant-app-v3",
  },
  author: {
    name: "clos266",
    url: "https://github.com/Clos266/itacademy-plant-app-v3",
  },
};
