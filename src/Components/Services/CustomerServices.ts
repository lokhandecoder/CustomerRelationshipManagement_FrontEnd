import { API_URL } from "../../API_CONFIG";
import { Customer } from "../Model/Customer";

export async function GetCustomers(): Promise<{ data: any }> {
  try {
    const response = await fetch(`${API_URL}customers`).then((res) =>
      res.json()
    );
    return response;
  } catch (err) {
    console.log("Error in getting customers");
    console.log(err);
    throw err;
  }
}
export const CreateCustomer = async (data: Customer) => {
  try {
    const response = await fetch(`${API_URL}customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      return res.json();
    });
    return response;
  } catch (err) {
    console.error("Error in creating customer");
    throw err;
  }
};
export const UpdateCustomer = async (id: number, data: any) => {
    try {
      const res = await fetch(`${API_URL}customers/${id}`, {
        method: "PUT",
        body: JSON.stringify({ customer: data }), // Ensure data is wrapped inside 'customer' object
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (!res.ok) {
        throw new Error("Could not update customer.");
      }
      return await res.json();
    } catch (err) {
      console.error("Error updating customer: ", err);
      throw err;
    }
  };

  export const DeleteCUstomer = async  (id:  number) => {
    try {
      const response = await fetch(`${API_URL}customers/${id}`, { method: "DELETE" });
      console.log("res", response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.text();
      return responseData ? JSON.parse(responseData) : null;
    } catch (err) {
      console.log(err);
      throw err;
    }
    
  }
