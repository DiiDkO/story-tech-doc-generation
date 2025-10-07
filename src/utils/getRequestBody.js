export const getRequestBody = () => {
   return {
      table: window.serviceNowTable,
      sys_id: window.serviceNowRecordId
    };
};
