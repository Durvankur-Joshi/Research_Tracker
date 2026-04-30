export const getKnowledgeGraph = (topicId = 'ai') => {
  const nodes = [
    { id: 'transformer', label: 'Transformer Architectures', status: 'solved', val: 35, description: 'Landmark architecture that revolutionized NLP' },
    { id: 'rlhf', label: 'RLHF', status: 'ongoing', val: 28, description: 'Reinforcement Learning from Human Feedback' },
    { id: 'multimodal', label: 'Multi-modal Alignment', status: 'unexplored', val: 12, description: 'Aligning vision, language, and audio' },
    { id: 'llm-scaling', label: 'LLM Scaling Laws', status: 'ongoing', val: 42, description: 'Understanding how performance scales with size' },
    { id: 'safety', label: 'AI Safety', status: 'ongoing', val: 22, description: 'Ensuring AI systems behave safely' },
    { id: 'few-shot', label: 'Few-shot Learning', status: 'solved', val: 18, description: 'Learning from minimal examples' },
    { id: 'interpretability', label: 'Model Interpretability', status: 'unexplored', val: 8, description: 'Understanding internal representations' },
    { id: 'efficient-attention', label: 'Efficient Attention', status: 'solved', val: 25, description: 'Linear and sparse attention mechanisms' },
    { id: 'embodied-ai', label: 'Embodied AI', status: 'unexplored', val: 6, description: 'AI in physical environments' },
    { id: 'reasoning', label: 'Logical Reasoning', status: 'ongoing', val: 30, description: 'Multi-step reasoning capabilities' },
  ]

  const links = [
    { source: 'transformer', target: 'llm-scaling', value: 25 },
    { source: 'transformer', target: 'efficient-attention', value: 20 },
    { source: 'transformer', target: 'few-shot', value: 15 },
    { source: 'rlhf', target: 'safety', value: 18 },
    { source: 'llm-scaling', target: 'reasoning', value: 22 },
    { source: 'multimodal', target: 'embodied-ai', value: 10 },
    { source: 'safety', target: 'interpretability', value: 14 },
    { source: 'reasoning', target: 'interpretability', value: 12 },
    { source: 'rlhf', target: 'multimodal', value: 8 },
    { source: 'efficient-attention', target: 'llm-scaling', value: 16 },
    { source: 'few-shot', target: 'multimodal', value: 9 },
  ]

  return { nodes, links }
}

export const getTrendData = () => [
  { year: 2019, papers: 12, citations: 450 },
  { year: 2020, papers: 28, citations: 890 },
  { year: 2021, papers: 54, citations: 2100 },
  { year: 2022, papers: 89, citations: 3800 },
  { year: 2023, papers: 145, citations: 6200 },
  { year: 2024, papers: 210, citations: 9800 },
  { year: 2025, papers: 278, citations: 15200 },
]

export const getGapList = () => [
  { id: 1, title: 'Efficient Long-Context Processing', description: 'Current transformers have O(n²) complexity, limiting context length', type: 'ongoing', severity: 'high' },
  { id: 2, title: 'Hallucination Mitigation', description: 'LLMs frequently generate false or ungrounded information', type: 'ongoing', severity: 'critical' },
  { id: 3, title: 'Cross-modal Reasoning', description: 'Bridging visual, textual, and auditory understanding', type: 'unexplored', severity: 'medium' },
  { id: 4, title: 'Energy-efficient Training', description: 'Training large models consumes massive computational resources', type: 'ongoing', severity: 'high' },
  { id: 5, title: 'Causal Reasoning in LLMs', description: 'Models struggle with true cause-effect understanding', type: 'unexplored', severity: 'high' },
  { id: 6, title: 'Continual Learning Without Forgetting', description: 'Models forget previous tasks when learning new ones', type: 'ongoing', severity: 'medium' },
]

export const getStats = () => ({
  solved: 45,
  ongoing: 78,
  unexplored: 34,
  totalPapers: 2847,
  activeResearchers: 12500,
})

export const getPapersForNode = (nodeId) => {
  const papersMap = {
    transformer: [
      { title: 'Attention Is All You Need', authors: 'Vaswani et al.', year: 2017, citations: 85000, abstract: 'The original transformer paper introducing self-attention mechanisms.' },
      { title: 'BERT: Pre-training of Deep Bidirectional Transformers', authors: 'Devlin et al.', year: 2018, citations: 52000, abstract: 'Bidirectional transformer for language understanding.' },
    ],
    rlhf: [
      { title: 'Training language models to follow instructions', authors: 'Ouyang et al.', year: 2022, citations: 3500, abstract: 'Aligning language models with human preferences.' },
    ],
    multimodal: [
      { title: 'Flamingo: a Visual Language Model for Few-Shot Learning', authors: 'Alayrac et al.', year: 2022, citations: 1800, abstract: 'Multi-modal learning with few-shot capabilities.' },
    ],
  }
  return papersMap[nodeId] || [
    { title: 'Sample Research Paper 1', authors: 'Research Team', year: 2023, citations: 120, abstract: 'An important contribution to this research area.' },
    { title: 'Sample Research Paper 2', authors: 'Academic Group', year: 2024, citations: 45, abstract: 'Recent advances in this domain.' },
  ]
}