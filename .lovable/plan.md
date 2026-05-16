## Goal
Add the Crafted Virtue illustration system and agent portraits across onboarding and the authenticated app — preserving current layouts, just adding visual richness.

## New illustrations to generate (5)
The existing registry covers Brand Studio / Content Engine / Truth Filter / Publishing / Analytics / Dashboard Review / Approach Signal / Problem Noise / Compass. I'll generate the missing onboarding-specific ones:

1. `onboardingProfile` — editorial executive profile card
2. `onboardingVoice` — handwritten line becoming a clean waveform
3. `onboardingPillars` — organized pillar cards (architectural columns)
4. `onboardingCalendar` — weekly calendar with approval checkmark
5. `onboardingScore` — brand score line chart on warm ivory

Existing illustrations reused for other steps:
- Welcome → `problemNoise` (signal from quiet)
- Objectives → `blogCompass` (compass / positioning)
- Channels → `featurePublishing`
- First content → `featureContentEngine`
- Analytics → `featureAnalytics`
- Complete → `approachSignal` (lighted window)

## Wiring per surface

**Onboarding** (`src/routes/onboarding.tsx`)
- Add `AgentAvatarStack` in the top "Your Crafted Virtue Agent" card
- Ensure all "Active Specialists" pills already use `AgentChip` (verify, fix if not)
- Add a small `IllustrationSpot` per step header

**App dashboard** (`src/routes/app.dashboard.tsx`)
- Small hero illustration (`dashboardReview`) in the welcome card
- Icon in Next Best Action card
- Agent avatars in Agent Activity timeline (verify)
- Illustration in empty/low states

**Content workspace** (`app.content.index.tsx`, `app.content.review.tsx`)
- Tiny `IllustrationSpot` per content-type card
- Agent avatar next to "created by"
- Status pill row with avatars at transition points

**Approvals** (`app.approvals.tsx`)
- Talia avatar on QA notes, Leo avatar on drafted-by
- Small Truth Filter spot illustration on citation block

**Publishing** (`app.publishing.tsx`)
- Abstract channel icons (already neutral)
- `featurePublishing` illustration in calendar header

**Analytics** (`app.analytics.tsx`)
- Sam avatar on Weekly Growth Briefing card
- `featureAnalytics` spot in radar/pillar section

**Voice Profile** (`app.voice.tsx`)
- `onboardingVoice` waveform hero
- Avatar of Olivia/Leo on "learned from edits" note

**Support** (`app.support.tsx`)
- Konrad avatar in chat header; handoff row showing Konrad → specialist with avatars

**Billing** (`app.billing.tsx`)
- Beatrice avatar on support note
- Small plan icon per tier

**Control Center agents** (`control-center.agents.tsx`) and **Enterprise team** (`enterprise.team.tsx`)
- Verify avatars already render; add executive placeholders if missing

## Avatar chip rules (enforced)
Already implemented in `AgentAvatar` / `AgentChip`: 16px circle before name, ring for contrast, alt text. No height change required.

## Out of scope
- No layout redesigns
- No new routes
- No animation work
- No copy changes