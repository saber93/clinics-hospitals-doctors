## Goal

Restore the previous behavior so clicking a clinic / doctor / hospital card opens the internal details page (where users can view info and book an appointment), instead of opening an external `*.zames.marketing` domain in a new tab.

## Changes

### 1. `src/components/clinics/ClinicCard.tsx`
Replace `handleClinicSelect` so it navigates internally:
```ts
const handleClinicSelect = () => navigate(`/clinics/${clinic.id}`);
```
Remove the `custom_domain` / `window.open(...)` logic.

### 2. `src/components/doctors/DoctorCard.tsx`
Replace `handleDoctorSelect` with:
```ts
const handleDoctorSelect = () => navigate(`/doctors/${doctor.id}`);
```
Remove external URL logic.

### 3. `src/components/hospitals/HospitalCard.tsx`
There is no dedicated `HospitalDetails` route currently. Two options:
- **(chosen)** Navigate to `/reservations` with hospital state (matches the existing booking flow used elsewhere), so clicking a hospital card opens the in-app booking page rather than an external site.
```ts
const handleHospitalSelect = () => navigate('/reservations', {
  state: { hospitalName: hospital.name, hospitalId: hospital.id }
});
```

No other files need changes — the existing routes `/clinics/:id` and `/doctors/:id` are already wired in `AppRoutes.tsx` and render `ClinicDetails` / `DoctorDetails` with booking actions.

### Out of scope
- Building a new `HospitalDetails` page (can be added later if you want a dedicated hospital details view).
- Removing the `custom_domain` field from types / data (kept for backward compatibility).
