// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = "https://fgtidefzahdlxeyxkiex.supabase.co";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndGlkZWZ6YWhkbHhleXhraWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NjEwNTQsImV4cCI6MjA3MTUzNzA1NH0.YhfttdyDjyVJx2H0DqKYYYuYjYh7hX8y5zTc2luQC5A";

// if (!supabaseUrl || !supabaseAnonKey) {
//   throw new Error('Missing Supabase environment variables');
// }

// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Database types
// export interface Database {
//   public: {
//     Tables: {
//       suppliers: {
//         Row: {
//           id: string;
//           name: string;
//           contact_person: string;
//           email: string;
//           phone: string;
//           address: string;
//           city: string;
//           state: string;
//           pincode: string;
//           gst_number: string | null;
//           payment_terms: string;
//           credit_limit: number;
//           status: 'Active' | 'Inactive';
//           created_at: string;
//           updated_at: string;
//         };
//         Insert: Omit<Database['public']['Tables']['suppliers']['Row'], 'id' | 'created_at' | 'updated_at'>;
//         Update: Partial<Database['public']['Tables']['suppliers']['Insert']>;
//       };
//       customers: {
//         Row: {
//           id: string;
//           name: string;
//           contact_person: string;
//           email: string;
//           phone: string;
//           address: string;
//           city: string;
//           state: string;
//           pincode: string;
//           gst_number: string | null;
//           customer_type: 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual';
//           credit_limit: number;
//           outstanding_amount: number;
//           status: 'Active' | 'Inactive';
//           last_order_date: string | null;
//           created_at: string;
//           updated_at: string;
//         };
//         Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>;
//         Update: Partial<Database['public']['Tables']['customers']['Insert']>;
//       };
//       products: {
//         Row: {
//           id: string;
//           name: string;
//           category: string;
//           supplier_id: string;
//           purchase_price: number;
//           selling_price: number;
//           stock: number;
//           min_stock: number;
//           description: string | null;
//           created_at: string;
//           updated_at: string;
//         };
//         Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
//         Update: Partial<Database['public']['Tables']['products']['Insert']>;
//       };
//       bills: {
//         Row: {
//           id: string;
//           bill_number: string;
//           customer_id: string;
//           date: string;
//           due_date: string;
//           subtotal: number;
//           tax_amount: number;
//           total_amount: number;
//           status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
//           payment_method: string | null;
//           notes: string | null;
//           created_at: string;
//           updated_at: string;
//         };
//         Insert: Omit<Database['public']['Tables']['bills']['Row'], 'id' | 'created_at' | 'updated_at'>;
//         Update: Partial<Database['public']['Tables']['bills']['Insert']>;
//       };
//       bill_items: {
//         Row: {
//           id: string;
//           bill_id: string;
//           product_id: string;
//           quantity: number;
//           unit_price: number;
//           total: number;
//           created_at: string;
//         };
//         Insert: Omit<Database['public']['Tables']['bill_items']['Row'], 'id' | 'created_at'>;
//         Update: Partial<Database['public']['Tables']['bill_items']['Insert']>;
//       };
//     };
//   };
// }
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://fgtidefzahdlxeyxkiex.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZndGlkZWZ6YWhkbHhleXhraWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5NjEwNTQsImV4cCI6MjA3MTUzNzA1NH0.YhfttdyDjyVJx2H0DqKYYYuYjYh7hX8y5zTc2luQC5A";

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      suppliers: {
        Row: {
          id: string;
          name: string;
          contact_person: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          state: string;
          pincode: string;
          gst_number: string | null;
          payment_terms: string;
          credit_limit: number;
          status: 'Active' | 'Inactive';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['suppliers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['suppliers']['Insert']>;
      };
      customers: {
        Row: {
          id: string;
          name: string;
          contact_person: string;
          email: string;
          phone: string;
          address: string;
          city: string;
          state: string;
          pincode: string;
          gst_number: string | null;
          customer_type: 'Retailer' | 'Wholesaler' | 'Institution' | 'Individual';
          credit_limit: number;
          outstanding_amount: number;
          status: 'Active' | 'Inactive';
          last_order_date: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['customers']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['customers']['Insert']>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          category: string;
          supplier_id: string;
          purchase_price: number;
          selling_price: number;
          stock: number;
          min_stock: number;
          description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['products']['Insert']>;
      };
      bills: {
        Row: {
          id: string;
          bill_number: string;
          customer_id: string;
          date: string;
          due_date: string;
          subtotal: number;
          tax_amount: number;
          total_amount: number;
          status: 'Draft' | 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
          payment_method: string | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bills']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['bills']['Insert']>;
      };
      bill_items: {
        Row: {
          id: string;
          bill_id: string;
          product_id: string;
          tender_product_id: string | null;
          quantity: number;
          unit_price: number;
          total: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['bill_items']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['bill_items']['Insert']>;
      };
      tenders: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          tender_number: string;
          client_name: string;
          start_date: string;
          end_date: string;
          status: 'Active' | 'Inactive' | 'Completed' | 'Cancelled';
          total_value: number;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tenders']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tenders']['Insert']>;
      };
      tender_products: {
        Row: {
          id: string;
          tender_id: string;
          product_id: string;
          localized_name: string;
          tender_price: number;
          quantity_limit: number | null;
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['tender_products']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['tender_products']['Insert']>;
      };
    };
  };
}