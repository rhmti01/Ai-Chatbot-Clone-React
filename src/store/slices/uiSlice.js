export const createUiSlice = (set) => ({
  showResults: false,
  chatScreenMode: "starter",
  loading: false,
  setShowResults: (v) => set({ showResults: v }),
  setChatScreenMode: (v) => set({ chatScreenMode: v }),
  setLoading: (v) => set({ loading: v }),
});
