import { Button, Card, CardContent, CardHeader, CardTitle, Input } from '@/ui';
import onboard from './server-actions';

export default function OnBoardingPage() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Hey there!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-10">
          <p>
            Welcome, we are exited to have you join us.
            <br />
            We will only ask for your name and you can start writing.
          </p>
          <form action={onboard} className="flex flex-col gap-6">
            <Input name="name" placeholder="Please tell us your name..." required />
            <Button type="submit" className="ml-auto">Start writing!</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
