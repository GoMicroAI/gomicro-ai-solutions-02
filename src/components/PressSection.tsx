import { ArrowRight } from "lucide-react";

const pressArticles = [
  {
    headline: "Boratto Farms leverages AI for leafy green quality assessment with GoMicro",
    outlet: "Fruitnet (Produce Plus)",
    date: "24 Sep 2025",
    teaser: "Fruitnet highlights GoMicro's AI-in-a-Box assessing leafy green quality on conveyor belts at commercial scale.",
    url: "https://www.fruitnet.com/produce-plus/boratto-farms-leverages-ai-for-leafy-green-quality-assessment-with-gomicro/268922.article",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>FRUITNET</text></svg>"
  },
  {
    headline: "Allowing farmers and harvesters to convert what they have got into digitally tradeable goods will be a game changer",
    outlet: "FreshPlaza",
    date: "27 Sep 2024",
    teaser: "GoMicro discusses turning quality signals into consistent, shareable data that reduces disputes and rejection risk across the supply chain.",
    url: "https://www.freshplaza.com/north-america/article/9663076/allowing-farmers-and-harvesters-to-convert-what-they-have-got-into-digitally-tradeable-goods-will-be-a-game-changer/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 620 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>FreshPlaza</text></svg>"
  },
  {
    headline: "How AI is helping green leaf quality assessment",
    outlet: "HortiDaily",
    date: "11 Sep 2024",
    teaser: "Coverage of GoMicro's approach to standardising leafy-green QC with objective, verifiable assessments.",
    url: "https://www.hortidaily.com/article/9657938/how-ai-is-helping-green-leaf-quality-assessment/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>HortiDaily</text></svg>"
  },
  {
    headline: "GoMicro AI tech enhances leafy green quality assessment",
    outlet: "Fruitnet (Produce Plus)",
    date: "10 Sep 2024",
    teaser: "Fruitnet reports on GoMicro's AI-powered inspection improving speed, consistency, and freshness outcomes for leafy greens.",
    url: "https://www.fruitnet.com/produce-plus/gomicro-ai-tech-enhances-leafy-green-quality-assessment/262288.article",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>FRUITNET</text></svg>"
  },
  {
    headline: "GoMicro revolutionizes strawberry quality assessment with AI",
    outlet: "HortiDaily",
    date: "31 May 2024",
    teaser: "HortiDaily covers GoMicro's AI strawberry assessment progress and how it supports consistent quality decisions.",
    url: "https://www.hortidaily.com/article/9631490/gomicro-revolutionizes-strawberry-quality-assessment-with-ai/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 520 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>HortiDaily</text></svg>"
  },
  {
    headline: "GoMicro AI web app live for five Australian crops",
    outlet: "Grain Central",
    date: "6 Mar 2024",
    teaser: "Grain Central reports on GoMicro's free web app enabling growers to assess defects in major crops via phone images.",
    url: "https://www.graincentral.com/ag-tech/gomicro-ai-web-app-live-for-five-australian-crops/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Grain Central</text></svg>"
  },
  {
    headline: "Briefs: Grain Detective in pipeline; Intersales buys CadMac",
    outlet: "Grain Central",
    date: "26 Apr 2024",
    teaser: "Grain Central covers GoMicro teaming with WALCO Engineering on Grain Detective, an AI-powered auto-sampling device for in-flow grain assessment.",
    url: "https://www.graincentral.com/news/briefs-grain-detective-in-pipeline-intersales-buys-cadmac/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Grain Central</text></svg>"
  },
  {
    headline: "Briefs: Changes for AgriChain, Agridry, GoMicro",
    outlet: "Grain Central",
    date: "13 Feb 2024",
    teaser: "Agribusiness briefs including GoMicro's MoU with AICRAFT to support AI assessment deployments in harsh environments.",
    url: "https://www.graincentral.com/news/agribusiness/briefs-changes-for-agrichain-agridry-gomicro/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 560 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Grain Central</text></svg>"
  },
  {
    headline: "India prepares for Aussie-developed AI grain assessment tool",
    outlet: "Farming Ahead",
    date: "12 Jan 2024",
    teaser: "Farming Ahead covers GoMicro's phone-based AI grain assessment being selected for use in India through Grain Analyser.",
    url: "https://www.farmingahead.com.au/cropping/news-articles/1463686/india-prepares-aussie-developed-ai-grain-assessment-tool",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='800' fill='currentColor'>Farming Ahead</text></svg>"
  },
  {
    headline: "New grain assessment app could revolutionise grain quality assessment",
    outlet: "The Land",
    date: "5 Jan 2024",
    teaser: "The Land reports on GoMicro's grain assessment app in testing and its potential to modernise quality checks.",
    url: "https://www.theland.com.au/story/8476217/new-grain-assessment-app-could-revolutionise-grain-quality-assessment/",
    logoSvg: "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 360 80'><text x='0' y='55' font-family='Inter, Arial, sans-serif' font-size='54' font-weight='900' fill='currentColor'>THE LAND</text></svg>"
  }
];

const PressSection = () => {
  return (
    <section id="press" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
          In the Press
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pressArticles.map((article, index) => (
            <article
              key={index}
              className="bg-card border border-border rounded-lg p-6 flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {/* Logo */}
              <div
                className="h-10 mb-4 pressLogo"
                dangerouslySetInnerHTML={{ __html: article.logoSvg }}
              />
              
              {/* Outlet & Date */}
              <p className="text-sm text-muted-foreground mb-2">
                {article.outlet} • {article.date}
              </p>
              
              {/* Headline */}
              <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-3">
                {article.headline}
              </h3>
              
              {/* Teaser */}
              <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-3">
                {article.teaser}
              </p>
              
              {/* Read Article Link */}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-gomicro-green hover:text-gomicro-green/80 font-medium text-sm transition-colors"
              >
                Read article
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;
