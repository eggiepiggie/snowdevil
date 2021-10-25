import {Link, useCartLinesTotalQuantity} from '@shopify/hydrogen/client';

import {useCartUI} from './CartUIProvider.client';

export default function Header() {
  return (
    <header
      className="z-10 relative flex items-center justify-between pt-3 md:pt-12 md:pb-4 md:px-8 max-w-7xl mx-auto"
      role="banner"
    >
      <nav>
        <ul className="hidden md:flex items-center justify-center space-x-6 font-medium relative">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/" className="flex items-center justify-center">
              Collections
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
      <Link
        className="text-center font-bold uppercase text-2xl tracking-widest absolute left-1/2 transform -translate-x-1/2"
        to="/"
      >
        My Shop
      </Link>
      <CartToggle />
    </header>
  );
}

function CartToggle() {
  const cartUI = useCartUI();
  const itemCount = useCartLinesTotalQuantity();

  if (cartUI == null) {
    throw new Error('CartToggle must be a descendent of a CartUIProvider');
  }

  const {isCartOpen, toggleCart} = cartUI;

  return (
    <button
      className="h-12 w-12 p-2 mr-2 md:mr-0 md:h-7 md:w-7 md:p-0"
      type="button"
      aria-expanded={isCartOpen}
      aria-controls="cart"
      onClick={toggleCart}
    >
      <div className="relative">
        <svg
          width="19"
          height="24"
          viewBox="0 0 19 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.5894 7H3.41063C2.89451 7 2.46318 7.39279 2.415 7.90666L1.205 20.8133C1.09502 21.9865 2.01796 23 3.19627 23H15.8037C16.982 23 17.905 21.9865 17.795 20.8133L16.585 7.90666C16.5368 7.39279 16.1055 7 15.5894 7Z"
            stroke="#1F2937"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
          />
          <path
            d="M6 7V9.98952C6 12.0075 7.63589 13.6434 9.65386 13.6434V13.6434C11.6718 13.6434 13.3077 12.0075 13.3077 9.98952V7"
            stroke="#1F2937"
            strokeWidth="2"
          />
          <path
            d="M13 6L13 4.5C13 2.567 11.433 1 9.5 1V1C7.567 1 6 2.567 6 4.5L6 6"
            stroke="#1F2937"
            strokeWidth="2"
            className={`${itemCount > 0 ? 'block' : 'hidden'}`}
          />
        </svg>

        <div
          className={`bg-blue-600 text-xs rounded-full leading-none text-white absolute bottom-0 right-0 flex items-center justify-center transform translate-y-1/2 transition-all ${
            itemCount > 0 ? 'h-4 w-4' : 'h-0 w-0 overflow-hidden'
          }`}
        >
          {itemCount > 0 ? itemCount : null}
        </div>
        <span className="sr-only">Cart, {itemCount} items</span>
      </div>
    </button>
  );
}
