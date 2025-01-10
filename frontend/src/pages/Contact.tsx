import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We'd love to hear from you
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-blue-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Phone</h3>
            </div>
            <p className="mt-2 text-gray-600">+94 11 234 5678</p>
            <p className="text-gray-600">Mon-Fri 9am to 6pm</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-blue-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Email</h3>
            </div>
            <p className="mt-2 text-gray-600">support@slbusbook.com</p>
            <p className="text-gray-600">We'll respond within 24 hours</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-600" />
              <h3 className="ml-3 text-lg font-medium text-gray-900">Office</h3>
            </div>
            <p className="mt-2 text-gray-600">123 Temple Road</p>
            <p className="text-gray-600">Colombo 00300, Sri Lanka</p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                label="Full Name"
                type="text"
                required
                placeholder="Your name"
              />
              <Input
                label="Email"
                type="email"
                required
                placeholder="your@email.com"
              />
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="How can we help you?"
                  required
                />
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
