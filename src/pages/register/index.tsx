import RegisterForm from "@/components/template/Register/Form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Register() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="min-w-96">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
