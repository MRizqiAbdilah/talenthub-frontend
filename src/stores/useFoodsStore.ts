import { create } from "zustand";
import { IFood } from "../types/food.type";

interface State {
  foods: IFood[];
  isLoading: boolean;
  error: unknown;
}

interface Actions {
  fetchData: () => Promise<void>;
}

const INITIAL_STATE: State = {
  foods: [],
  isLoading: false,
  error: null,
};

export const useFoodsStore = create<State & Actions>((set) => ({
  ...INITIAL_STATE,
  fetchData: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        "https://backend-talenthub.vercel.app/foods"
      );
      const result = await response.json();
      set({ foods: result.data, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
