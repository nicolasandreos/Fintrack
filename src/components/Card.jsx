import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

const CardSection = ({ icon, text, value }) => {
  return (
    <Card className="bg-card h-29.25 w-103.5">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-white/4 p-2">{icon}</div>
          <CardDescription>{text}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="-mt-6 text-2xl font-bold">{value}</CardContent>
    </Card>
  );
};

export default CardSection;
