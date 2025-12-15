import { ArrowRight, ExternalLink } from "lucide-react";

const pressArticles = [
  {
    headline: "Boratto Farms leverages AI for leafy green quality assessment with GoMicro",
    outlet: "Fruitnet (Produce Plus)",
    date: "24 Sep 2025",
    teaser: "Fruitnet highlights GoMicro's AI-in-a-Box assessing leafy green quality on conveyor belts at commercial scale.",
    url: "https://www.fruitnet.com/produce-plus/boratto-farms-leverages-ai-for-leafy-green-quality-assessment-with-gomicro/268922.article",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>FRUITNET</text></svg>",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop"
  },
  {
    headline: "Allowing farmers and harvesters to convert what they have got into digitally tradeable goods will be a game changer",
    outlet: "FreshPlaza",
    date: "27 Sep 2024",
    teaser: "GoMicro discusses turning quality signals into consistent, shareable data that reduces disputes and rejection risk across the supply chain.",
    url: "https://www.freshplaza.com/north-america/article/9663076/allowing-farmers-and-harvesters-to-convert-what-they-have-got-into-digitally-tradeable-goods-will-be-a-game-changer/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 620 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>FreshPlaza</text></svg>",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=300&fit=crop"
  },
  {
    headline: "How AI is helping green leaf quality assessment",
    outlet: "HortiDaily",
    date: "11 Sep 2024",
    teaser: "Coverage of GoMicro's approach to standardising leafy-green QC with objective, verifiable assessments.",
    url: "https://www.hortidaily.com/article/9657938/how-ai-is-helping-green-leaf-quality-assessment/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>HortiDaily</text></svg>",
    image: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?w=400&h=300&fit=crop"
  },
  {
    headline: "GoMicro AI tech enhances leafy green quality assessment",
    outlet: "Fruitnet (Produce Plus)",
    date: "10 Sep 2024",
    teaser: "Fruitnet reports on GoMicro's AI-powered inspection improving speed, consistency, and freshness outcomes for leafy greens.",
    url: "https://www.fruitnet.com/produce-plus/gomicro-ai-tech-enhances-leafy-green-quality-assessment/262288.article",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>FRUITNET</text></svg>",
    image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?w=400&h=300&fit=crop"
  },
  {
    headline: "GoMicro revolutionizes strawberry quality assessment with AI",
    outlet: "HortiDaily",
    date: "31 May 2024",
    teaser: "HortiDaily covers GoMicro's AI strawberry assessment progress and how it supports consistent quality decisions.",
    url: "https://www.hortidaily.com/article/9631490/gomicro-revolutionizes-strawberry-quality-assessment-with-ai/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>HortiDaily</text></svg>",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop"
  },
  {
    headline: "GoMicro AI web app live for five Australian crops",
    outlet: "Grain Central",
    date: "6 Mar 2024",
    teaser: "Grain Central reports on GoMicro's free web app enabling growers to assess defects in major crops via phone images.",
    url: "https://www.graincentral.com/ag-tech/gomicro-ai-web-app-live-for-five-australian-crops/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Grain Central</text></svg>",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop"
  },
  {
    headline: "Briefs: Grain Detective in pipeline; Intersales buys CadMac",
    outlet: "Grain Central",
    date: "26 Apr 2024",
    teaser: "Grain Central covers GoMicro teaming with WALCO Engineering on Grain Detective, an AI-powered auto-sampling device for in-flow grain assessment.",
    url: "https://www.graincentral.com/news/briefs-grain-detective-in-pipeline-intersales-buys-cadmac/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Grain Central</text></svg>",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop"
  },
  {
    headline: "Briefs: Changes for AgriChain, Agridry, GoMicro",
    outlet: "Grain Central",
    date: "13 Feb 2024",
    teaser: "Agribusiness briefs including GoMicro's MoU with AICRAFT to support AI assessment deployments in harsh environments.",
    url: "https://www.graincentral.com/news/agribusiness/briefs-changes-for-agrichain-agridry-gomicro/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Grain Central</text></svg>",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&h=300&fit=crop"
  },
  {
    headline: "India prepares for Aussie-developed AI grain assessment tool",
    outlet: "Farming Ahead",
    date: "12 Jan 2024",
    teaser: "Farming Ahead covers GoMicro's phone-based AI grain assessment being selected for use in India through Grain Analyser.",
    url: "https://www.farmingahead.com.au/cropping/news-articles/1463686/india-prepares-aussie-developed-ai-grain-assessment-tool",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Farming Ahead</text></svg>",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=400&h=300&fit=crop"
  },
  {
    headline: "New grain assessment app could revolutionise grain quality assessment",
    outlet: "The Land",
    date: "5 Jan 2024",
    teaser: "The Land reports on GoMicro's grain assessment app in testing and its potential to modernise quality checks.",
    url: "https://www.theland.com.au/story/8476217/new-grain-assessment-app-could-revolutionise-grain-quality-assessment/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='900' fill='currentColor'>THE LAND</text></svg>",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop"
  }
];

const PressSection = () => {
  return (
    <section id="press" className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Media Coverage
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
            In the <span className="text-primary">Press</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            See what leading agricultural publications are saying about GoMicro
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pressArticles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.headline}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute top-4 right-4 p-2 bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ExternalLink className="h-4 w-4 text-foreground" />
                </div>
                {/* Logo overlay */}
                <div
                  className="absolute bottom-4 left-4 h-6 pressLogoDark"
                  dangerouslySetInnerHTML={{ __html: article.logoSvg }}
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                {/* Outlet & Date */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {article.outlet}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {article.date}
                  </span>
                </div>
                
                {/* Headline */}
                <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                  {article.headline}
                </h3>
                
                {/* Teaser */}
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {article.teaser}
                </p>
                
                {/* Read Article Link */}
                <div className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all duration-300">
                  Read article
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
