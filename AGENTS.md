# Apartment Community 3D Visualizer

## Project Goal

Build a lightweight interactive 3D marketing MVP for an apartment community.

The application should allow a prospective home buyer or sales/marketing person to:

- See the whole apartment development from an aerial perspective.
- Orbit and zoom around the development.
- Hover/tap apartment wings.
- Select a wing.
- Smoothly move the camera toward the selected wing.
- View basic wing information in an HTML UI panel.
- Explore amenities on the property.
- Reset to the main development overview.
- Run a simple guided marketing tour.

This is NOT intended to be architecturally exact in the MVP.

The first version should recreate the development approximately from reference images using procedural geometry.

Real GLB architectural models should be replaceable later without redesigning the application.

---

# Technology

Use:

- Vite
- React
- TypeScript
- Three.js
- @react-three/fiber
- @react-three/drei
- Zustand for application state if state becomes non-trivial

Avoid adding large libraries unless necessary.

Do not use a game engine.

---

# Architecture Principles

The React application owns:

- navigation
- menus
- property information
- amenity information
- selected wing
- guided tour
- UI state

React Three Fiber owns:

- buildings
- terrain
- vegetation
- roads
- paths
- water
- lighting
- cameras
- 3D interaction

Do NOT build normal buttons, menus or information panels as Three.js objects.

Use normal React HTML/CSS overlays for application UI.

---

# Source Structure

Use approximately:

src/
  app/
    App.tsx

  scene/
    CommunityScene.tsx
    CameraController.tsx
    Lighting.tsx
    Ground.tsx
    Environment.tsx

  components/
    Wing.tsx
    Road.tsx
    Tree.tsx
    Water.tsx
    AmenityMarker.tsx
    BuildingLabel.tsx

  ui/
    TopBar.tsx
    PropertyPanel.tsx
    AmenityPanel.tsx
    Toolbar.tsx
    GuidedTour.tsx
    LoadingScreen.tsx

  data/
    site.ts
    wings.ts
    amenities.ts

  hooks/
    useCameraNavigation.ts

  store/
    useCommunityStore.ts

  types/
    community.ts

---

# Reference Material

Reference images:

docs/reference/masterplan.jpg
docs/reference/project-details.jpg

Treat the masterplan as visual guidance.

Do NOT claim the generated 3D model is dimensionally or architecturally accurate.

Positions, road widths, vegetation and building dimensions may initially be approximate.

Keep site data centralized so measurements can later be corrected.

---

# Known Project Information

Net Site Area:

6.28 acres

Units:

683

Number of Wings:

12

Wings:

60
61
62
63
64
65
66
67
68
69
70
71

Approximate floor configuration:

Wings:
60, 61, 62, 63, 64, 65, 66, 69, 70

2 Basement + Ground + 14 floors

Wings:
67, 68

2 Basement + Ground + 11 floors

Wing:
71

2 Basement + Ground + 13 floors

For the visual MVP, basements do not need to be rendered.

Only above-ground massing is required.

---

# Apartment Types

Type C:
3 BHK
1553 sq ft SBA

Type D:
3 BHK
1789 sq ft SBA

Do not invent pricing or availability.

---

# Amenities

A - Play Deck

B - The Lanai / Tropical Garden

C - Isla Verde / Cabana Island

D - Activity Arena

E - Celebration Court

F - Yoga Lawn

G - Camping Grounds

H - Tranquillity Valley

I - Paradise Grove

J - Serenity Trail

K - Bamboo Bower

L - Green Spine

Represent these approximately based on their location in the reference masterplan.

---

# Visual Direction

The MVP should look like a premium architectural massing model.

Avoid:

- cartoon appearance
- gaming aesthetic
- neon effects
- excessive bloom
- unrealistic saturated colors
- sci-fi UI
- exaggerated animations

Prefer:

- neutral architectural materials
- warm daylight
- subtle shadows
- natural vegetation
- muted landscaping
- restrained highlighting
- smooth camera movements

The goal is:

"interactive architectural marketing model"

not:

"3D game"

---

# Building Implementation

Create a reusable Wing component.

A wing should receive configuration such as:

id
position
rotation
width
depth
floors
heightPerFloor

Example concept:

<Wing
  id="68"
  position={[10, 0, 3]}
  rotation={0}
  floors={11}
/>

Generate placeholder buildings procedurally.

Each building should visually communicate multiple floors.

Use simple repeating windows/balconies only if performance remains good.

Do not create thousands of individual meshes.

Prefer merged/repeated geometry and instancing when appropriate.

---

# Data Driven Design

Do not hardcode Wing 60, Wing 61, etc. separately inside scene JSX.

Store them in:

src/data/wings.ts

Example:

{
  id: "68",
  floors: 11,
  position: [8, 0, 2],
  rotation: 0,
  width: 20,
  depth: 8
}

Map the data into Wing components.

The same rule applies to amenities.

This will eventually allow the frontend to consume data from an API.

---

# Wing Interaction

Desktop:

hover:
show subtle highlight

click:
select wing

Mobile/tablet:

tap:
select wing

Selected wing should:

- visibly highlight
- show its label
- update React UI
- cause camera to move toward it

Do not use aggressive glowing effects.

---

# Camera

Initial view:

Aerial three-quarter perspective of the complete community.

Provide:

- orbit
- controlled zoom
- limited pan
- reset camera

Prevent the camera from going underground.

Prevent users from getting completely lost.

When a wing is selected:

smoothly animate camera toward it.

Do not instantly teleport.

Camera animation should be interruptible.

---

# Property Panel

Use normal HTML/CSS.

For selected Wing 68, for example:

Wing 68

3 BHK Residences

11 Residential Floors

Type C
1553 sq ft

Type D
1789 sq ft

[Explore Wing]

"Explore Wing" can initially move closer to the building.

It does not need interior navigation in milestone 1.

---

# Amenity Interaction

Users should be able to enable an Amenities mode.

Show amenity markers A-L.

Selecting an amenity should:

- select it
- show its name
- move the camera toward its approximate location

Example:

F
Yoga Lawn

Do not render large floating labels for every amenity simultaneously.

---

# Guided Tour

Create a lightweight guided tour.

Example stages:

1. Development overview
2. Main residential wings
3. Central landscaped zone
4. Wing 68
5. Celebration Court
6. Forestscape
7. Water feature
8. Return to overview

The sequence should be data-driven.

Do not hardcode camera animation logic separately for every UI button.

---

# Future Model Support

Design Wing so placeholder geometry can eventually be replaced by:

/models/wing-68.glb

without changing selection, camera or application-state architecture.

Eventually support:

modelUrl?: string

If modelUrl exists:
load GLB

Otherwise:
render procedural geometry.

Do not implement all GLB models in milestone 1.

---

# Performance

The application must work on:

- modern desktop Chrome
- modern Safari
- modern Android devices
- iPhone Safari

Optimize for mobile from the beginning.

Important:

Use instancing for repeated trees.

Do not create hundreds of high-poly tree meshes.

Limit realtime shadows.

Avoid unnecessary postprocessing.

Avoid huge textures.

Prefer GLB/glTF for future models.

Support sensible DPR limiting.

Avoid rerendering the entire React tree on every animation frame.

Use useFrame only when necessary.

Dispose of resources correctly.

---

# Responsive Behaviour

Desktop:

3D canvas fills the experience.
Information panel can sit on the right side.

Mobile:

Information should appear as a bottom sheet or compact panel.

Do not permanently cover large portions of the 3D scene.

Touch controls must work.

---

# Accessibility

Normal application controls must be HTML.

Buttons should have accessible labels.

The application must remain understandable if a user cannot hover.

Hover must not be required for essential information.

---

# Coding Quality

Use TypeScript properly.

Avoid `any` unless unavoidable.

Extract reusable components.

Do not build everything inside App.tsx.

Do not create giant scene components.

Avoid premature abstraction.

Keep data independent from rendering logic.

Add short comments only where logic is non-obvious.

---

# Validation

Before considering a task complete:

npm run build

must succeed.

Resolve TypeScript errors.

Check browser console for obvious Three.js warnings.

Verify the application works at desktop and mobile viewport sizes.

---

# Development Behaviour

Work incrementally.

Do NOT attempt to build the entire envisioned product in one change.

Complete the requested milestone first.

Do not introduce:

- authentication
- backend
- database
- CRM
- apartment inventory
- pricing
- interior walkthroughs
- WebXR

unless explicitly requested.

Keep the MVP focused.