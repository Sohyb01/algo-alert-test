"use client";
import getStripe from "@/lib/utils";
import React from "react";

const MembershipCard = (props: any) => {
  //
  const handleCreateCheckoutSession = async (productId: string) => {
    const res = await fetch("/api/stripe/checkout-session", {
      method: "POST",
      body: JSON.stringify(productId),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const checkoutSession = await res.json().then((value) => {
      return value.session;
    });
    const stripe = await getStripe();
    const { error } = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.id,
    });
  };

  return (
    <div className="flex flex-col items-center px-8 py-12 gap-8 rounded-[64px] w-[320px] lg:w-full  lg:min-w-[0px] membership glow-shadow">
      {/* Title Row */}
      <div className="flex items-center text-center justify-between w-full">
        {/* <Image
                  src={MembershipSectionData.diamond_image_url}
                  alt="Diamond Image"
                  width={180}
                  height={180}
                  className="absolute left-16"
                /> */}
        <h5 className="font-bold text-lg">{props.membership.planType}</h5>
        <p className="text-lg">{props.membership.price}</p>
      </div>
      <div className="w-full h-0.5 bg-slate-600"></div>
      {/* Benefits / Nonbenefits list*/}
      <div className="flex flex-col text-start items-start w-full text-white gap-5">
        {props.membership.benefits.map((benefit: String, index: number) => (
          <div key={index} className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <path
                d="M6.33334 0.659668C3.01966 0.659668 0.333344 3.34598 0.333344 6.65967C0.333344 9.97354 3.01966 12.6597 6.33334 12.6597C9.64722 12.6597 12.3333 9.97354 12.3333 6.65967C12.3333 3.34598 9.64722 0.659668 6.33334 0.659668ZM6.33334 11.9215C3.43853 11.9215 1.08334 9.55448 1.08334 6.65964C1.08334 3.76483 3.43853 1.40964 6.33334 1.40964C9.22816 1.40964 11.5833 3.76484 11.5833 6.65964C11.5833 9.55445 9.22816 11.9215 6.33334 11.9215ZM8.72791 4.46423L5.20758 8.00667L3.62227 6.42136C3.47583 6.27492 3.23846 6.27492 3.09183 6.42136C2.94539 6.56779 2.94539 6.80517 3.09183 6.95161L4.94789 8.80786C5.09433 8.95411 5.33171 8.95411 5.47833 8.80786C5.49521 8.79098 5.50966 8.77259 5.52278 8.75348L9.25853 4.99466C9.40478 4.84822 9.40478 4.61084 9.25853 4.46423C9.11191 4.31779 8.87453 4.31779 8.72791 4.46423Z"
                fill="white"
              />
            </svg>
            <p>{benefit}</p>
          </div>
        ))}
        {props.membership.nonbenefits.map((benefit: String, index: number) => (
          <div
            key={index}
            className="flex items-center gap-4 line-through text-neutral-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
            >
              <path
                d="M6.33334 0.659668C3.01966 0.659668 0.333344 3.34598 0.333344 6.65967C0.333344 9.97354 3.01966 12.6597 6.33334 12.6597C9.64722 12.6597 12.3333 9.97354 12.3333 6.65967C12.3333 3.34598 9.64722 0.659668 6.33334 0.659668ZM6.33334 11.9215C3.43853 11.9215 1.08334 9.55448 1.08334 6.65964C1.08334 3.76483 3.43853 1.40964 6.33334 1.40964C9.22816 1.40964 11.5833 3.76484 11.5833 6.65964C11.5833 9.55445 9.22816 11.9215 6.33334 11.9215ZM8.72791 4.46423L5.20758 8.00667L3.62227 6.42136C3.47583 6.27492 3.23846 6.27492 3.09183 6.42136C2.94539 6.56779 2.94539 6.80517 3.09183 6.95161L4.94789 8.80786C5.09433 8.95411 5.33171 8.95411 5.47833 8.80786C5.49521 8.79098 5.50966 8.77259 5.52278 8.75348L9.25853 4.99466C9.40478 4.84822 9.40478 4.61084 9.25853 4.46423C9.11191 4.31779 8.87453 4.31779 8.72791 4.46423Z"
                fill="white"
              />
            </svg>
            <p>{benefit}</p>
          </div>
        ))}
      </div>
      <div className="w-full h-0.5 bg-slate-600"></div>
      <button
        // onClick={() => console.log("test")}
        onClick={() => handleCreateCheckoutSession(props.membership.priceId)}
        className="btn-1 gradient-bg-1"
      >
        Purchase
      </button>
    </div>
  );
};

export default MembershipCard;