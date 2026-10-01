/** `settings` é singleton — sempre um único documento, sem slug. */
export const SETTINGS_QUERY = `*[_type == "settings"][0]{
  whatsapp,
  phone,
  email,
  hours,
  address,
  socialLinks,
  defaultCTA,
  seoDefaults
}`;
