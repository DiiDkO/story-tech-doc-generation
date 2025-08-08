export const getRequestBody = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      table: 'rm_story',
      sys_id: 'f66a861c1b1faa10150a5467624bcb3e'
    };
  } else {
    return {
      table: window.servicenowTable,
      sys_id: window.servicenowRecordId
    };
  }
};
