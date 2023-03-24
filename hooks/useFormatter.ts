export const useFormatter = () => ({
   formatDate: (date: string) => {
      const dateFormat = new Date(date);
      return new Intl.DateTimeFormat("pt-BR").format(dateFormat);
   },
});
