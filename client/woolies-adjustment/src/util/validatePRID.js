import axios from "axios";
const validatePayrollId = async (payrollId) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    payrollId,
  });
  try {
    const res = await axios.post("api/employee/validate", body, config);
    
    return res;
  } catch (error) {
      console.log(error)
      const data ="employee not found"
      return data
  }
};

const validateFunction = (call, payrollId) =>{
  return new Promise(resolve =>{
        if (call){
            const res = validatePayrollId(payrollId);
            if (res){
                resolve (res);
            }
            else {
                resolve("error");
            }
            
        }
        else resolve("error")
        
    })
}
export default validateFunction;
