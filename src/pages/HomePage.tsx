import { PageHeader, PageHeaderHeading } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div>
      <PageHeader>
        <PageHeaderHeading>Bienvenido a PlantApp</PageHeaderHeading>
      </PageHeader>

      <section>
        <Card>
          <CardContent>
            <h3>Paso 1: Añadir planta</h3>
            <p>Fácil y rápido desde "myplants"</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Paso 2: elige un evento de intercambio</h3>
            <p>En la seccion de eventos encontratas todo lo necesario.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h3>Acude a la cita!</h3>
            <p>
              Acude al punto de encuentro y disfruta del intercambio de plantas.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
