export interface Student {
  usn: string;
  name: string;
  year: number;
  section: string;
  email: string;
  phone: string;
  address?: string;
  dob?: string;
  parent_name?: string;
  parent_phone?: string;
}

export interface StudentFormData {
  usn: string;
  name: string;
  year: string;
  section: string;
  email: string;
  phone: string;
  address?: string;
  dob?: string;
  parent_name?: string;
  parent_phone?: string;
}
