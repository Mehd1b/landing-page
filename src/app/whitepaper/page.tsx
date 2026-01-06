'use client';
import AnimatedBackground from '../components/AnimatedBackground';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function WhitepaperPage() {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatedBackground />
      
      <div className="border-b border-gray-800/50">
        <Header />
        <div className="relative z-10 flex justify-end items-center px-8 pb-4">
          <div className="text-sm text-gray-400">
            Whitepaper v1.0
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-4xl mx-auto px-8 py-12">
        <article className="prose prose-invert prose-lg max-w-none">
          <header className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-light mb-4">
              Verifiable On-Chain AI Agent Marketplace
            </h1>
            <div className="w-32 h-1 bg-linear-to-r from-cyan-400 via-purple-500 to-emerald-400 mx-auto rounded-full"></div>
          </header>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">Abstract</h2>
            <div className="bg-gray-900/60 rounded-2xl p-8 border border-gray-700/50">
              <p className="text-gray-300 leading-8">
                This paper presents a decentralized protocol that enables the creation, discovery, and usage of artificial intelligence agents whose behavior is cryptographically verifiable on-chain. The protocol allows users to delegate capital or decision-making authority to off-chain AI agents while maintaining strict trust minimization guarantees. This is achieved through the combination of zero-knowledge proofs, constrained execution environments, and deterministic on-chain enforcement. The system is designed such that users do not need to trust agent developers, executors, or the AI models themselves, but only the underlying cryptographic assumptions.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">1. Introduction</h2>
            <p className="text-gray-300 leading-8 mb-6">
              Artificial intelligence agents are increasingly used in decentralized finance, automated trading, governance automation, and protocol operations. Despite their growing importance, current systems require users to place significant trust in off-chain actors. Users must trust agent developers not to include malicious logic, infrastructure operators not to deviate from declared behavior, and AI models not to act in ways that violate user expectations. This trust assumption is fundamentally incompatible with the ethos of decentralized systems.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              This protocol introduces a new primitive referred to as verifiable AI execution. Under this paradigm, every action performed by an AI agent is accompanied by a cryptographic proof that attests that the agent followed a pre-committed program, model, and set of constraints. The result is an AI execution framework that is auditable, enforceable, and trust-minimized.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-6">1.1 Related Work</h3>
            <p className="text-gray-300 leading-8 mb-6">
              Several existing projects explore the intersection of artificial intelligence and blockchain, but they rely on fundamentally different trust and execution assumptions. Autonolas and similar agent coordination frameworks focus on decentralized agent orchestration and incentive alignment, but they do not provide cryptographic guarantees that agents execute a specific program or respect strict behavioral constraints. As a result, correctness and safety ultimately depend on off-chain trust.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              Bittensor introduces a token-incentivized marketplace for machine learning models, where participants are rewarded based on peer evaluation and network consensus. While effective for coordinating open-ended machine learning research, this approach does not provide deterministic guarantees about agent behavior or enforceable execution constraints. Model outputs are economically incentivized rather than cryptographically verified.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              Visions.ai proposes a token-driven marketplace for AI agents, emphasizing economic alignment and reputation. However, agent execution remains opaque, and users must trust that reported behavior and performance accurately reflect reality. The system does not provide a mechanism to prove that an agent adhered to a specific strategy or respected predefined safety constraints during execution.
            </p>
            <p className="text-gray-300 leading-8">
              Our approach addresses a fundamentally different problem. Rather than optimizing incentives around unverifiable execution, the protocol enforces correctness at the cryptographic level. By combining deterministic execution environments with zero-knowledge proofs, constrained state transitions, and on-chain verification, the system ensures that every agent action is provably compliant with its declared behavior. Unlike prior work, trust is removed not by social or economic mechanisms alone, but by verifiable computation.
            </p>
          </section>

          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">1.2 Problem Statement</h3>
            <p className="text-gray-300 leading-8">
              Existing AI agent marketplaces rely on opaque off-chain execution environments and unverifiable performance claims. Users cannot independently verify whether an agent executed the advertised strategy, whether historical returns are accurate, or whether funds are at risk of misuse. Smart contracts alone are insufficient to express complex AI logic efficiently, while purely off-chain systems lack enforceability. This gap between expressiveness and verifiability prevents the safe adoption of autonomous agents in Web3.
            </p>
          </section>
          <section className="mb-12">
            <h3 className="text-2xl font-semibold text-white mb-6">1.3 Design Goals</h3>
            <p className="text-gray-300 leading-8">
              The protocol is designed to eliminate unnecessary trust assumptions while remaining practical and scalable. It aims to ensure that no centralized party is required for correct operation, that every agent action can be verified cryptographically, and that participation as a developer, executor, or user remains permissionless. The architecture is intentionally modular so that execution, constraint enforcement, accounting, and analytics can evolve independently. Scalability is achieved by minimizing on-chain computation and leveraging recursive zero-knowledge proofs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">2. High-Level Architecture</h2>
            <p className="text-gray-300 leading-8 mb-6">
              The system is composed of several interacting actors and components. Agent developers author AI agents and publish cryptographic commitments to their code and models. Users interact with the protocol through isolated vaults that hold their assets. Executors run agents off-chain and generate proofs of correct execution. Smart contracts deployed on-chain are responsible for verifying proofs, enforcing constraints, and executing authorized actions.
            </p>
            <p className="text-gray-300 leading-8">
              At the protocol level, the architecture includes an agent registry, user vault contracts, a zero-knowledge proof system, verifier contracts, and a metrics engine that maintains verifiable reputation data. Each component has a narrowly defined responsibility in order to minimize complexity and attack surface.
            </p>
            <br>
            </br>
            <h3 className="text-2xl font-semibold text-white mb-6">2.1 Agent Lifecycle</h3>
            <p className="text-gray-300 leading-8 mb-6">
              The lifecycle of an agent begins with registration. An agent developer compiles the agent into a deterministic execution format, such as WASM, and computes cryptographic commitments to the agent code, the model parameters, and the declared execution constraints. These commitments are published on-chain and become immutable identifiers for the agent.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              Once registered, agents become discoverable through the marketplace interface. Users can evaluate agents based on strategy descriptions, declared risk constraints, and performance metrics that are derived from verifiable execution history. Because all metrics are backed by cryptographic proofs, users do not need to rely on self-reported claims.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-6">2.2 User Vaults</h3>
            <p className="text-gray-300 leading-8 mb-6">
              Users interact with agents exclusively through dedicated vault smart contracts. Each vault holds the user's assets and enforces strict execution policies. The vault only accepts actions that are accompanied by valid zero-knowledge proofs and that comply with the agent's declared constraints. At no point does an agent or executor gain direct custody of user funds, which significantly reduces the risk of misuse or theft.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-6">2.3 Execution Workflow</h3>
            <p className="text-gray-300 leading-8 mb-6">
              Execution proceeds in discrete epochs. During each epoch, an executor collects canonical inputs, including the current vault state and external data such as oracle prices. The agent is then executed off-chain in a deterministic environment using the committed code and model. Following execution, the executor generates a zero-knowledge proof attesting that the execution was correct and that all constraints were respected.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              The proof, along with a description of the resulting actions, is submitted on-chain. The smart contracts verify the proof and, if it is valid, execute the authorized actions atomically. If the proof is invalid, the transaction is rejected and no state changes occur.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-6">2.4 Zero-Knowledge Proof System</h3>
            <p className="text-gray-300 leading-8 mb-6">
              The proof system is structured as a composition of several logical circuits. One circuit proves correct agent execution with respect to the committed code and model. Another circuit enforces the declared safety and risk constraints. A third circuit verifies the correctness of state transitions and accounting within the vault. A final circuit computes performance metrics and reputation scores. These circuits are recursively aggregated into a single proof that can be verified efficiently on-chain.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-6">2.5 Constraint Model</h3>
            <p className="text-gray-300 leading-8 mb-6">
              Constraints are declared by the agent developer at registration time and enforced cryptographically during execution. These constraints may include limits on drawdown, restrictions on asset transfers, bounds on position sizes, and prohibitions on certain external calls. Any execution that violates these constraints results in an invalid proof and is therefore rejected by the protocol.
            </p>

            <h3 className="text-2xl font-semibold text-white mb-6">2.6 Performance and Reputation</h3>
            <p className="text-gray-300 leading-8">
              Performance metrics such as return on investment, volatility, and maximum drawdown are computed within zero-knowledge circuits. Because these metrics are derived from provably correct state transitions, they cannot be forged or manipulated. The resulting reputation scores provide users with a reliable basis for comparing agents.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">3. Accounting and State Roots</h2>
            <p className="text-gray-300 leading-8">
              Vault state is represented by a Merkle-based state root that commits to balances, open positions, and accrued fees. Each execution produces a new state root, and the proof system guarantees that the transition from the previous state root to the new one is correct. This approach allows the protocol to maintain a compact on-chain representation of complex off-chain state.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">4. Incentive Model</h2>
            <p className="text-gray-300 leading-8">
              The protocol includes a native incentive structure that aligns the interests of all participants. Users pay execution and performance fees in exchange for verifiable agent behavior. Developers receive royalties proportional to the usage and success of their agents. Executors are compensated for running agents and generating proofs. All fee distribution logic is enforced on-chain and is fully transparent.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">5. Tokenomics</h2>
            <p className="text-gray-300 leading-8 mb-6">
              The protocol is governed and coordinated by a native utility token that serves as the economic backbone of the system. This token is designed to align long-term incentives between users, agent developers, executors, and governance participants, while avoiding reliance on speculative mechanics. The token plays an active role in protocol security, coordination, and value distribution rather than serving solely as a medium of exchange.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              The primary function of the token is to secure and regulate participation in the protocol. Executors are required to stake tokens in order to submit execution proofs. This staking mechanism creates an economic guarantee of honest behavior, as executors who submit invalid proofs or attempt to censor executions can be penalized through slashing. The staking requirement also acts as a Sybil-resistance mechanism, ensuring that execution power is backed by economic cost.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              Agent developers may optionally stake tokens to signal confidence in their agents. Staked agents benefit from increased visibility in the marketplace and preferential discovery. If an agent is shown, through verifiable execution history, to consistently violate declared constraints or underperform relative to its claims, the developer's stake may be reduced or locked, creating a reputational and economic cost for dishonest behavior.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              Users interact with the token primarily through fee payments and governance participation. A portion of execution fees and performance fees is denominated in the native token, creating persistent demand tied directly to protocol usage. Fee revenue collected by the protocol is partially redistributed to token stakers, aligning token holders with the growth and health of the ecosystem.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              The token also serves as the governance mechanism for the protocol. Token holders may participate in decisions regarding protocol upgrades, parameter tuning, supported execution environments, verifier keys, and the evolution of agent standards. Governance is explicitly constrained to avoid interference with individual agent execution, which remains strictly rule-based and proof-enforced.
            </p>
            <p className="text-gray-300 leading-8 mb-6">
              Token issuance follows a capped or predictably decaying supply schedule to avoid long-term inflationary pressure. Initial distribution is allocated among the core contributors, early developers, ecosystem incentives, and a community treasury. The community treasury is governed on-chain and is used to fund research, security audits, prover infrastructure, and ecosystem development.
            </p>
            <p className="text-gray-300 leading-8">
              Importantly, the value of the token is directly coupled to real protocol activity rather than abstract narratives. As more agents are deployed, more executions are proven, and more capital flows through verified vaults, token demand increases through staking requirements, fee payments, and governance participation. This creates a feedback loop in which protocol adoption strengthens the economic security and coordination capacity of the system.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">6. Security Considerations</h2>
            <p className="text-gray-300 leading-8">
              The protocol is designed to mitigate a wide range of attack vectors, including malicious agent code, executor deviation, and state manipulation. Security relies on well-understood cryptographic assumptions underlying hash functions and zero-knowledge proof systems. By minimizing trusted components, the protocol reduces the impact of potential failures.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">7. Scalability Considerations</h2>
            <p className="text-gray-300 leading-8">
              Scalability is achieved through off-chain execution and recursive proof aggregation. On-chain verification remains lightweight, making the protocol suitable for deployment on layer two networks and rollups. As proof systems improve, the protocol can benefit from reduced costs without fundamental redesign.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">8. Future Work</h2>
            <p className="text-gray-300 leading-8">
              Future extensions of the protocol include governance frameworks for agent standards, composition of multiple agents, on-chain governance over agent upgrades, and integration with hardware-based attestations. These directions aim to further expand the applicability of verifiable AI agents.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-white mb-6 text-center">9. Conclusion</h2>
            <div className="bg-gray-900/60 rounded-2xl p-8 border border-gray-700/50">
              <p className="text-gray-300 leading-8">
                This protocol introduces a foundational layer for trustless AI agents in decentralized systems. By combining zero-knowledge proofs, constrained execution, and on-chain enforcement, it enables a new class of autonomous agents whose behavior is verifiable, accountable, and economically aligned with user interests.
              </p>
            </div>
          </section>
        </article>
      </main>
      
      <Footer />
    </div>
  );
}