import apiClient from "../api";

export const GetCountryByIp = async (langID: string) => {
  try {
    const data = await apiClient().get(
      `Services/GetCountryByIp?langID=${langID}`
    );

    return data.data.Country;
  } catch (error) {
    console.log(error);
  }
};
