export interface Order {
  id: number;
  token: string;
  store_id: number;
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  contact_identification?: any;
  shipping_min_days?: any;
  shipping_max_days?: any;
  billing_name: string;
  billing_phone: string;
  billing_address: string;
  billing_number: string;
  billing_floor: string;
  billing_locality: string;
  billing_zipcode: string;
  billing_city: string;
  billing_province: string;
  billing_country: string;
  shipping_cost_owner: string;
  shipping_cost_customer: string;
  coupon: any[];
  promotional_discount: Promotionaldiscount;
  subtotal: string;
  discount: string;
  discount_coupon?: any;
  discount_gateway: string;
  total: string;
  total_usd: string;
  checkout_enabled: boolean;
  weight: string;
  currency: string;
  language: string;
  gateway: string;
  gateway_id?: any;
  gateway_name: string;
  shipping: string;
  shipping_option: string;
  shipping_option_code: string;
  shipping_option_reference?: any;
  shipping_pickup_details?: any;
  shipping_tracking_number?: any;
  shipping_tracking_url?: any;
  shipping_store_branch_name?: any;
  shipping_store_branch_extra?: any;
  shipping_pickup_type: string;
  shipping_suboption: any[];
  extra: Extra;
  storefront: string;
  note: string;
  created_at: string;
  updated_at: string;
  completed_at: Completedat;
  next_action: string;
  payment_details: Paymentdetails;
  attributes: any[];
  free_shipping_config?: any;
  order_origin?: any;
  products: Product[];
  customer_visit: Customervisit;
  fulfillments: Fulfillment[];
  number: number;
  cancel_reason?: any;
  owner_note?: any;
  cancelled_at?: any;
  closed_at?: any;
  read_at?: any;
  status: string;
  payment_status: string;
  gateway_link?: any;
  has_shippable_products: boolean;
  shipping_carrier_name?: any;
  shipping_address: Shippingaddress;
  shipping_status: string;
  shipped_at?: any;
  paid_at?: any;
  landing_url: string;
  client_details: Clientdetails;
  app_id?: any;
}

interface Clientdetails {
  browser_ip: string;
  user_agent: string;
}

interface Shippingaddress {
  address: string;
  city: string;
  country: string;
  created_at: string;
  default: boolean;
  floor: string;
  id: number;
  locality: string;
  name: string;
  number: string;
  phone: string;
  province: string;
  updated_at: string;
  zipcode: string;
  customs?: any;
}

interface Fulfillment {
  id: string;
  number: string;
  assigned_location: Assignedlocation;
  status: string;
  shipping: Shipping;
  tracking_info: Trackinginfo;
}

interface Trackinginfo {
  code: string;
}

interface Shipping {
  type: string;
  extras: Extras;
  carrier: Carrier;
  option: Carrier;
}

interface Carrier {
  name: string;
}

interface Extras {
  shippable: boolean;
}

interface Assignedlocation {
  location_id: string;
  name: string;
}

interface Customervisit {
  created_at: string;
  landing_page: string;
  utm_parameters: Utmparameters;
}

interface Utmparameters {
  utm_campaign?: any;
  utm_content?: any;
  utm_medium?: any;
  utm_source?: any;
  utm_term?: any;
}

export interface Product {
  id: number;
  depth: string;
  height: string;
  name: string;
  price: string;
  compare_at_price: string;
  product_id: number;
  image: Image;
  quantity: number;
  free_shipping: number;
  weight: string;
  width: string;
  variant_id: number;
  variant_values: string[];
  properties: any[];
  sku: string;
  barcode?: any;
  cost?: any;
}

interface Image {
  id: number;
  product_id: number;
  src: string;
  position: number;
  alt: any[];
  created_at: string;
  updated_at: string;
}

interface Paymentdetails {
  method: string;
  credit_card_company?: any;
  installments: number;
}

interface Completedat {
  date: string;
  timezone_type: number;
  timezone: string;
}

interface Extra {}

interface Promotionaldiscount {
  id?: any;
  store_id: number;
  order_id: number;
  created_at: string;
  total_discount_amount: string;
  contents: any[];
  promotions_applied: any[];
}
