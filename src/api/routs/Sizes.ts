import apiClient from "../api";

export const GetSizes = async () => {
  try {
    const data = await apiClient().post(`Vikik/SizesGet`);
    return data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const GetColors = async (lang: string) => {
  try {
    const data = await apiClient().post(`Vikik/ColorsGet?langId=${lang}`);
    return data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
