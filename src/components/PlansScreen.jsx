// import React, { useEffect, useState } from "react";
// import { db } from "../Firebase";
// import { getDocs, collection, addDoc, onSnapshot } from "firebase/firestore";
// import { useSelector } from "react-redux";
// import { selectUser } from "../features/userSlice";
// import { loadStripe } from "@stripe/stripe-js";
// function PlansScreen() {
//   const [products, setProducts] = useState([]);
//   const user = useSelector(selectUser);
//   const [customers, setCustomers] = useState([])

//   const productsCollectionRef = collection(db, "products");
//   useEffect(() => {
//     const getProducts = async () => {
//       try {
//         const data = await getDocs(productsCollectionRef);
//         const filterData = data.docs.map((doc) => ({
//           ...doc.data(),
//           id: doc.id,
//         }));
//         console.log(filterData);
//         setProducts(filterData);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getProducts();
//   }, []);

//   const loadCheckout = async (priceId) => {
//     const collectionRef = collection(db, "customers");
//     const payload = {
//       price: priceId,
//       success_url: window.location.origin,
//       cancel_url: window.location.origin,
//     };
//        await addDoc(collectionRef, payload);
//   };

//   //   onSnapshot.customerCollectionRef(async (snap) => {
//   //     const { error, sessionId } = snap.data();

//   //     if (error) {
//   //       alert(`An error occured ${error.message}`);
//   //     }
//   //     if (sessionId) {
//   //       const stripe = await loadStripe(
//   //         "pk_test_51MWoCHLNaRz9xwTcuDjOSSYcG9KNOPpniL6Tg73SBTE3wbdevhSx9RvTlKz9qOvMSJuCjPIsuMXwsO0sOTtLcISq00mzpFm5Mv"
//   //       );
//   //       stripe.redirectToCheckout({  sessionId  })
//   //     }
//   //   })}

//   return (
//     <div className="plansScreen">
//       {products.map((product, index) => (
//         <div className="plansScreen__plan" key={product.id}>
//           <div className="plansScreen__info">
//             <h5>{product.name}</h5>
//             <h6>{product.description} </h6>
//           </div>
//           <button onClick={loadCheckout}>
//             Subscribe
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default PlansScreen;

// // const docRef =  collection(db, "customers")
// //   const loadCheckout = async (priceId) => {
// //     const result = await getDocs(docRef);

// //     const docedRef = result.docs.map((doc) => ({
// //         ...doc.data(user.id),
// //         price: priceId,
// //         success_url: window.location.origin,
// //         cancel_url: window.location.origin,
// //       }));

// //     docedRef.onSnapshot(async (snap) => {
// //       const { error, sessionId } = snap.data();

// //       if (error) {
// //         alert(`An error occured ${error.message}`);
// //       }
// //       if (sessionId) {
// //         const stripe = await loadStripe(
// //           "pk_test_51MWoCHLNaRz9xwTcuDjOSSYcG9KNOPpniL6Tg73SBTE3wbdevhSx9RvTlKz9qOvMSJuCjPIsuMXwsO0sOTtLcISq00mzpFm5Mv"
// //         );
// //         stripe.redirectToCheckout({  sessionId  })
// //       }
// //     });
// //   };

import React, { useEffect, useState } from "react";
import db from "../Firebase";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
  CollectionReference,
  onSnapshot,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlansScreen() {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "customers", user.uid, "subscriptions"));

    onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        // console.log(subscription.data());

        setSubscription({
          role: subscription.data().role,
          current_period_start:
            subscription.data().current_period_start.seconds,
          current_period_end: subscription.data().current_period_end.seconds,
        });
      });
    });
  }, [user.uid]);

  useEffect(() => {
    const q = query(collection(db, "products"), where("active", "==", true));

    onSnapshot(q, (querySnapshot) => {
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();

        const productDocRef = doc(db, "products", productDoc.id);
        // REFERENCE NA productDoc zde musi byt a tu potom použit v getDoc collection
        const priceSnap = await getDocs(collection(productDocRef, "prices"));

        priceSnap.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });
      setProducts(products);
    });
  }, []);

  //   console.log(products);
  //   console.log(subscription);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(db, "customers", user.uid, "checkout_sessions"),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to a customer and inspect your
        // Cloud functions logs in the firebase console.
        alert(`An error occurred: ${error.message}`);
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe(
          "pk_test_51MWoCHLNaRz9xwTcuDjOSSYcG9KNOPpniL6Tg73SBTE3wbdevhSx9RvTlKz9qOvMSJuCjPIsuMXwsO0sOTtLcISq00mzpFm5Mv"
        );
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className="plansScreen">
      <br />
      {subscription && (
        <p className="plansScreen__renewal">
          Renewal date:{" "}
          {new Date(
            subscription?.current_period_end * 1000
          ).toLocaleDateString()}
        </p>
      )}
      {Object.entries(products).map(([productId, productData]) => {
        // TODO: Add some logic to check if the user's subscription is active
        const isCurrentPackage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);

        return (
          <div
            key={productId}
            className={`${
              isCurrentPackage && "plansScreen__plan--disabled"
            } plansScreen__plan`}
          >
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPackage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPackage ? "Current Plan" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlansScreen;
