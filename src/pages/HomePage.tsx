import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent/20 via-primary/10 to-secondary/20 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <span className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <img
                src="/favicon.svg"
                className="w-10 h-10"
                alt="PlantApp logo"
              />
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Welcome to <span className="text-primary">PlantApp</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow plant enthusiasts. Exchange, learn, and grow
            your collection in a community passionate about nature.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="px-8 py-3 text-lg">
              🌱 Get Started
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
              📖 Browse Events
            </Button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <div className="w-32 h-32 bg-primary/30 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 opacity-20">
          <div className="w-40 h-40 bg-accent/30 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Plants Exchanged</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">150+</div>
              <div className="text-muted-foreground">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Monthly Events</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trading plants has never been easier. Follow these simple steps
              and join our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="relative group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-primary-foreground">
                    1
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  🌿 Add Your Plants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Upload photos of your plants, add detailed descriptions, and
                  mark which ones are available for exchange.
                </p>
                <div className="mt-6 p-4 bg-accent rounded-xl">
                  <div className="text-sm text-accent-foreground font-medium">
                    ✨ Tip: Better photos = more exchanges
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full transform translate-x-16 -translate-y-16"></div>
            </Card>

            {/* Step 2 */}
            <Card className="relative group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-secondary-foreground">
                    2
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  📅 Find Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Explore exchange events near you. Filter by date, location,
                  and types of plants available.
                </p>
                <div className="mt-6 p-4 bg-accent rounded-xl">
                  <div className="text-sm text-accent-foreground font-medium">
                    🗓️ New events every week
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full transform translate-x-16 -translate-y-16"></div>
            </Card>

            {/* Step 3 */}
            <Card className="relative group hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-accent-foreground">
                    3
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold text-card-foreground">
                  🤝 Exchange!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Attend the event, meet other enthusiasts, and enjoy exchanging
                  plants in a friendly environment.
                </p>
                <div className="mt-6 p-4 bg-secondary rounded-xl">
                  <div className="text-sm text-secondary-foreground font-medium">
                    🎉 Make new green friends!
                  </div>
                </div>
              </CardContent>
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full transform translate-x-16 -translate-y-16"></div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to grow your collection?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join hundreds of plant lovers who are already exchanging and
            building a green community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg">
              🚀 Start Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              💬 Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
