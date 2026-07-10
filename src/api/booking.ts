export type CreateBookingRequest = {
  companyZvrNumber: string;
  serviceCode: string;
  hours: number;
  customerNote?: string;
  household: {
    name: string;
    street: string;
    houseNumber?: string;
    apartment?: string;
    postalCode: string;
    city: string;
  };
  client: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
  };
};

export type CreateBookingResponse = {
  bookingId: string;
  status: "REQUESTED";
};

export class BookingApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

const API_URL = import.meta.env.VITE_API_URL;

export async function createBooking(
  payload: CreateBookingRequest,
): Promise<CreateBookingResponse> {
  let response: Response;

  if (!API_URL) {
    throw new BookingApiError(
      "Derzeit kann keine Anfrage gesendet werden. Bitte versuchen Sie es später erneut.",
    );
  }

  try {
    response = await fetch(`${API_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new BookingApiError(
      "Derzeit kann keine Anfrage gesendet werden. Bitte versuchen Sie es später erneut.",
    );
  }

  if (!response.ok) {
    if (response.status === 400) {
      throw new BookingApiError(
        "Bitte prüfen Sie Ihre Angaben und versuchen Sie es erneut.",
        response.status,
      );
    }

    throw new BookingApiError(
      "Derzeit kann keine Anfrage gesendet werden. Bitte versuchen Sie es später erneut.",
      response.status,
    );
  }

  return response.json() as Promise<CreateBookingResponse>;
}
