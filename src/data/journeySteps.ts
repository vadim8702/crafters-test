export interface JourneyStep {
  id: number
  title: string
  description: string
  icon: string
}

export const journeySteps: JourneyStep[] = [
  {
    id: 1,
    title: "Inquiry Received",
    description: "Your journey begins when you reach out to us with your marine project needs. We carefully review every request.",
    icon: "envelope"
  },
  {
    id: 2,
    title: "Analysis & Questions",
    description: "Our experts thoroughly analyze your requirements. If we need clarification, we'll reach out to ensure we understand your vision.",
    icon: "search"
  },
  {
    id: 3,
    title: "Quotation",
    description: "We prepare a detailed, transparent quotation tailored specifically to your project requirements and specifications.",
    icon: "document"
  },
  {
    id: 4,
    title: "Adjustments",
    description: "Based on your feedback, we fine-tune the proposal. Your satisfaction with the plan is our priority before we proceed.",
    icon: "settings"
  },
  {
    id: 5,
    title: "Order Confirmation",
    description: "Once approved, we officially confirm your order and prepare our team for flawless project execution.",
    icon: "check"
  },
  {
    id: 6,
    title: "Project Start",
    description: "Our skilled craftsmen begin work on your marine project with precision, expertise, and dedication to excellence.",
    icon: "rocket"
  },
  {
    id: 7,
    title: "Status Updates",
    description: "Throughout the project, we keep you informed with regular progress updates, photos, and milestone reports.",
    icon: "chart"
  },
  {
    id: 8,
    title: "Product Ready",
    description: "Your product undergoes rigorous quality checks to ensure it meets our high standards and your expectations.",
    icon: "cube"
  },
  {
    id: 9,
    title: "Delivery",
    description: "We ensure safe, timely delivery of your completed marine product to your specified location.",
    icon: "truck"
  },
  {
    id: 10,
    title: "Happy Customer",
    description: "Project completion celebration! Your satisfaction is our greatest reward and the goal of everything we do.",
    icon: "smile"
  },
  {
    id: 11,
    title: "Ongoing Support",
    description: "Our relationship doesn't end at delivery. We remain available for support, maintenance, and future projects.",
    icon: "support"
  }
]
