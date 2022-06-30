const axios = require("axios");

class PaymentService {
  async createPayment(req, res, prod) {
    const url = "https://api.mercadopago.com/checkout/preferences";
    let allProducts = []
    prod.forEach(p => {
      let obj = {
        "title": p.name,
        "description": p.description,
        "category_id": p.category,
        "quantity": p.quantity,
        "unit_price": p.price
      }
      allProducts.push(obj)
    });

    const body = {
      payer_email: "test_user_91448486@testuser.com",
      items: allProducts ,
      back_urls: {
        failure: "/failure",
        pending: "/pending",
        success: "/success"
      }
    };

    const payment = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return payment.data;
  }

  async createSuscription() {
    const url = "https://api.mercadopago.com/preapproval";

    const body = {
      reason: "Suscripción a GrupoEcommerce",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 1000,
        currency_id: "ARS"
      },
      back_url: "https://google.com.ar",
      payer_email: "test_user_91448486@testuser.com"
    };

    const suscription = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
      }
    });

    return suscription.data;
  }
}

module.exports = PaymentService;