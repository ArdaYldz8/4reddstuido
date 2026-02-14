"use client";

import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import {
  categoryLabels,
  pricingItems,
  type PricingCategory,
} from "@/data/pricing";
import { reddTheme } from "@/styles/muiTheme";
import { packageTimingRules } from "@/features/reservation/constants/timingRules";
import {
  buildWhatsappMessage,
  calculateTotal,
  formatCurrency,
  getMinDate,
} from "@/features/reservation/lib/booking";

const bookingPhone = "905555555555";

const categoryOrder: PricingCategory[] = [
  "studio",
  "lighting",
  "audio",
  "camera",
  "modifiers",
  "backdrop",
  "included",
];

export default function ReservationPage() {
  const [selectedPackageId, setSelectedPackageId] = useState("studio-half-day");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<PricingCategory>("lighting");
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    timeSlot: "",
    projectType: "",
    note: "",
  });

  const packageItems = useMemo(
    () => pricingItems.filter((item) => item.category === "studio"),
    []
  );

  const extraItems = useMemo(
    () =>
      pricingItems.filter(
        (item) => item.category !== "studio" && item.category !== "included"
      ),
    []
  );

  const selectableCategories = useMemo(
    () =>
      categoryOrder.filter((category) =>
        extraItems.some((item) => item.category === category)
      ),
    [extraItems]
  );

  const filteredExtraItems = extraItems.filter(
    (item) => item.category === activeCategory
  );

  const selectedPackage = packageItems.find((item) => item.id === selectedPackageId);
  const selectedPackageTiming =
    packageTimingRules[selectedPackageId] ?? packageTimingRules["studio-half-day"];
  const selectedExtraItems = extraItems.filter((item) =>
    selectedExtras.includes(item.id)
  );
  const includedItems = pricingItems.filter((item) => item.category === "included");

  const groupedItems = categoryOrder
    .map((category) => ({
      category,
      items: pricingItems.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  const handlePackageChange = (packageId: string) => {
    const nextTiming =
      packageTimingRules[packageId] ?? packageTimingRules["studio-half-day"];

    setSelectedPackageId(packageId);
    setFormValues((prev) => {
      if (nextTiming.mode === "full-day") {
        return {
          ...prev,
          timeSlot: nextTiming.fixedSlot ?? nextTiming.slots[0],
        };
      }

      return nextTiming.slots.includes(prev.timeSlot)
        ? prev
        : { ...prev, timeSlot: "" };
    });
  };

  const toggleExtra = (itemId: string, checked: boolean) => {
    setSelectedExtras((prev) => {
      if (checked) {
        if (prev.includes(itemId)) return prev;
        return [...prev, itemId];
      }
      return prev.filter((id) => id !== itemId);
    });
  };

  const totalPrice = calculateTotal(selectedPackage, selectedExtraItems);

  const canSubmit = Boolean(
    formValues.name.trim() &&
      formValues.phone.trim() &&
      formValues.date &&
      (selectedPackageTiming.mode === "full-day" || formValues.timeSlot)
  );

  const whatsappMessage = buildWhatsappMessage({
    selectedPackage,
    selectedPackageTiming,
    selectedExtraItems,
    totalPrice,
    formValues,
  });

  const openWhatsApp = () => {
    if (!canSubmit) return;
    const link = `https://wa.me/${bookingPhone}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <ThemeProvider theme={reddTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          pt: { xs: 12, md: 14 },
          pb: 6,
          overflowX: "hidden",
          background:
            "radial-gradient(1200px 480px at 15% -10%, rgba(255,70,70,0.2), transparent 60%), radial-gradient(1000px 500px at 100% 5%, rgba(160,0,0,0.18), transparent 55%), #070707",
        }}
      >
        <Container maxWidth={false} sx={{ maxWidth: 1380 }}>
          <Card
            sx={{
              border: "1px solid rgba(255,255,255,0.14)",
              background:
                "linear-gradient(120deg, rgba(44,0,0,0.92) 0%, rgba(12,12,12,0.95) 48%, rgba(72,0,0,0.92) 100%)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, md: 5 } }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.8 }}>
                REDD Studio
              </Typography>
              <Typography
                variant="h1"
                sx={{ mt: 1, fontSize: { xs: 30, md: 56 }, lineHeight: 1.1 }}
              >
                Rezervasyon ve Fiyatlandirma
              </Typography>
              <Typography sx={{ mt: 2, color: "rgba(255,255,255,0.8)", maxWidth: 780 }}>
                Paket secimini yap, ekipmanlarini ekle ve talebini tek adimda
                ilet. Tum fiyatlar kategorik olarak listelenir, toplam secimlerine
                gore anlik guncellenir.
              </Typography>
            </CardContent>
          </Card>

          <Box
            sx={{
              mt: 3,
              display: "grid",
              gridTemplateColumns: { xs: "1fr", xl: "minmax(0, 1fr) 390px" },
              gap: 2,
              alignItems: "start",
            }}
          >
            <Stack spacing={2}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h3" sx={{ fontSize: 30 }}>
                    1) Stüdyo Paketi
                  </Typography>
                  <FormControl sx={{ mt: 2, width: "100%" }}>
                    <RadioGroup
                      value={selectedPackageId}
                      onChange={(event) => handlePackageChange(event.target.value)}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 1.5,
                      }}
                    >
                      {packageItems.map((item) => (
                        <Card
                          key={item.id}
                          variant="outlined"
                          sx={{
                            borderColor:
                              selectedPackageId === item.id
                                ? "primary.main"
                                : "rgba(255,255,255,0.2)",
                            bgcolor:
                              selectedPackageId === item.id
                                ? "rgba(255,77,79,0.12)"
                                : "rgba(0,0,0,0.28)",
                          }}
                        >
                          <FormControlLabel
                            value={item.id}
                            control={<Radio />}
                            sx={{ m: 0, p: 1.2, width: "100%", alignItems: "flex-start" }}
                            label={
                              <Stack spacing={0.4}>
                                <Typography fontWeight={700}>{item.title}</Typography>
                                <Typography color="primary.main" fontWeight={700}>
                                  {formatCurrency(item.price)}
                                </Typography>
                              </Stack>
                            }
                          />
                        </Card>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h3" sx={{ fontSize: 30 }}>
                    2) Ek Ekipmanlar
                  </Typography>
                  <Typography sx={{ mt: 0.8, color: "text.secondary" }}>
                    Kategori sec ve sadece ihtiyacin olan ekipmanlari isaretle.
                  </Typography>

                  <Tabs
                    value={Math.max(selectableCategories.indexOf(activeCategory), 0)}
                    onChange={(_, value: number) =>
                      setActiveCategory(selectableCategories[value])
                    }
                    variant="scrollable"
                    sx={{ mt: 1.5, minHeight: 44 }}
                  >
                    {selectableCategories.map((category) => (
                      <Tab
                        key={category}
                        label={categoryLabels[category]}
                        sx={{ minHeight: 44, textTransform: "none", fontWeight: 600 }}
                      />
                    ))}
                  </Tabs>

                  <Box
                    sx={{
                      mt: 1.5,
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 1,
                    }}
                  >
                    {filteredExtraItems.map((item) => {
                      const checked = selectedExtras.includes(item.id);
                      return (
                        <Card
                          key={item.id}
                          variant="outlined"
                          sx={{
                            borderColor: checked
                              ? "primary.main"
                              : "rgba(255,255,255,0.2)",
                            bgcolor: checked
                              ? "rgba(255,77,79,0.12)"
                              : "rgba(0,0,0,0.25)",
                          }}
                        >
                          <FormControlLabel
                            sx={{ m: 0, p: 1.2, width: "100%", alignItems: "flex-start" }}
                            control={
                              <Checkbox
                                checked={checked}
                                onChange={(event) => {
                                  toggleExtra(item.id, event.target.checked);
                                }}
                              />
                            }
                            label={
                              <Stack spacing={0.25}>
                                <Typography sx={{ lineHeight: 1.4, wordBreak: "break-word" }}>
                                  {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {formatCurrency(item.price)}
                                </Typography>
                              </Stack>
                            }
                          />
                        </Card>
                      );
                    })}
                  </Box>

                  {includedItems.length > 0 && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography fontWeight={700} mb={0.5}>
                        Kiralamaya Dahil
                      </Typography>
                      <Stack component="ul" sx={{ pl: 2, m: 0 }}>
                        {includedItems.map((item) => (
                          <Typography component="li" key={item.id} variant="body2">
                            {item.title}
                            {item.note ? ` - ${item.note}` : ""}
                          </Typography>
                        ))}
                      </Stack>
                    </Alert>
                  )}
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h3" sx={{ fontSize: 30 }}>
                    3) Rezervasyon Formu
                  </Typography>

                  <Box
                    sx={{
                      mt: 2,
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                      gap: 1.5,
                    }}
                  >
                    <TextField
                      label="Ad Soyad *"
                      value={formValues.name}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, name: event.target.value }))
                      }
                      size="small"
                    />
                    <TextField
                      label="Telefon *"
                      value={formValues.phone}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, phone: event.target.value }))
                      }
                      size="small"
                    />
                    <TextField
                      label="E-posta"
                      type="email"
                      value={formValues.email}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, email: event.target.value }))
                      }
                      size="small"
                    />
                    <TextField
                      label="Tarih *"
                      type="date"
                      value={formValues.date}
                      onChange={(event) =>
                        setFormValues((prev) => ({ ...prev, date: event.target.value }))
                      }
                      size="small"
                      slotProps={{
                        inputLabel: { shrink: true },
                        htmlInput: { min: getMinDate() },
                      }}
                    />
                    {selectedPackageTiming.mode === "full-day" ? (
                      <TextField
                        label="Saat Aralığı"
                        value={selectedPackageTiming.fixedSlot ?? "10:00 - 18:00"}
                        size="small"
                        disabled
                        helperText="Tam gun paketinde saat araligi sabittir."
                      />
                    ) : (
                      <TextField
                        select
                        label="Saat Aralığı *"
                        value={formValues.timeSlot}
                        onChange={(event) =>
                          setFormValues((prev) => ({ ...prev, timeSlot: event.target.value }))
                        }
                        size="small"
                      >
                        <MenuItem value="">Seciniz</MenuItem>
                        {selectedPackageTiming.slots.map((slot) => (
                          <MenuItem key={slot} value={slot}>
                            {slot}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                    <TextField
                      label="Proje Turu"
                      value={formValues.projectType}
                      onChange={(event) =>
                        setFormValues((prev) => ({
                          ...prev,
                          projectType: event.target.value,
                        }))
                      }
                      size="small"
                    />
                  </Box>

                  <TextField
                    label="Ek Not"
                    multiline
                    minRows={4}
                    value={formValues.note}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, note: event.target.value }))
                    }
                    sx={{ mt: 1.5, width: "100%" }}
                  />
                </CardContent>
              </Card>

              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h3" sx={{ fontSize: 26, mb: 1 }}>
                    Tam Fiyat Referansi
                  </Typography>
                  <Typography sx={{ color: "text.secondary", mb: 1.2 }}>
                    Bu alan sadece referans listesidir. Secili kalemler Ek Ekipmanlar alanindaki secimlerine gore isaretlenir.
                  </Typography>
                  {groupedItems.map((group) => (
                    <Accordion
                      key={group.category}
                      defaultExpanded={group.category === "studio"}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
                        <Typography
                          fontWeight={700}
                          color="primary.main"
                          sx={{ textTransform: "uppercase", letterSpacing: 1 }}
                        >
                          {categoryLabels[group.category]}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ pt: 0.5 }}>
                        <Stack spacing={0.8}>
                          {group.items.map((item) => (
                            <Box
                              key={item.id}
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: 2,
                                fontSize: 14,
                                px: 1,
                                py: 0.4,
                                borderRadius: 1,
                                minWidth: 0,
                                bgcolor:
                                  (group.category === "studio" &&
                                    selectedPackageId === item.id) ||
                                  selectedExtras.includes(item.id)
                                    ? "rgba(255,77,79,0.1)"
                                    : "transparent",
                              }}
                            >
                              <Stack direction="row" alignItems="center" spacing={1} sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                  variant="body2"
                                  sx={{ minWidth: 0, pr: 1, wordBreak: "break-word" }}
                                >
                                  {item.title}
                                </Typography>
                              </Stack>

                              <Stack direction="row" alignItems="center" spacing={1} sx={{ flexShrink: 0 }}>
                                <Typography variant="body2" fontWeight={700}>
                                  {item.included ? "Dahil" : formatCurrency(item.price)}
                                </Typography>
                                {group.category === "studio" &&
                                  selectedPackageId === item.id && (
                                    <Typography
                                      variant="caption"
                                      sx={{ color: "primary.main", fontWeight: 700 }}
                                    >
                                      Secili
                                    </Typography>
                                  )}
                              </Stack>
                            </Box>
                          ))}
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </CardContent>
              </Card>
            </Stack>

            <Card
              variant="outlined"
              sx={{ position: { xl: "sticky" }, top: { xl: 112 } }}
            >
              <CardContent>
                <Typography variant="h3" sx={{ fontSize: 30, mb: 1 }}>
                  Talep Ozeti
                </Typography>

                <Card variant="outlined" sx={{ bgcolor: "rgba(0,0,0,0.28)", p: 1.2 }}>
                  <Typography color="text.secondary" variant="body2">
                    Secilen Paket
                  </Typography>
                  <Typography fontWeight={700} mt={0.5}>
                    {selectedPackage?.title}
                  </Typography>
                  <Typography color="primary.main" fontWeight={700}>
                    {formatCurrency(selectedPackage?.price ?? 0)}
                  </Typography>
                </Card>

                <Card
                  variant="outlined"
                  sx={{ bgcolor: "rgba(0,0,0,0.28)", p: 1.2, mt: 1 }}
                >
                  <Typography color="text.secondary" variant="body2">
                    Ek Ekipmanlar
                  </Typography>
                  {selectedExtraItems.length === 0 ? (
                    <Typography mt={0.5}>Ek ekipman secilmedi.</Typography>
                  ) : (
                    <Stack spacing={0.4} mt={0.8}>
                      {selectedExtraItems.map((item) => (
                        <Box
                          key={item.id}
                          sx={{ display: "flex", justifyContent: "space-between", gap: 1, minWidth: 0 }}
                        >
                          <Typography variant="body2" sx={{ minWidth: 0, pr: 1, wordBreak: "break-word" }}>
                            {item.title}
                          </Typography>
                          <Typography variant="body2" fontWeight={700} sx={{ flexShrink: 0 }}>
                            {formatCurrency(item.price)}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  )}
                </Card>

                <Card
                  sx={{
                    mt: 1.2,
                    border: "1px solid rgba(255,77,79,0.6)",
                    bgcolor: "rgba(255,77,79,0.12)",
                    p: 1.4,
                  }}
                >
                  <Typography color="text.secondary" variant="body2">
                    Tahmini Toplam
                  </Typography>
                  <Typography
                    sx={{ fontSize: 34, fontWeight: 800, lineHeight: 1.1, mt: 0.4 }}
                  >
                    {formatCurrency(totalPrice)}
                  </Typography>
                </Card>

                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 1.5, fontWeight: 700, color: "#0f172a" }}
                  disabled={!canSubmit}
                  onClick={openWhatsApp}
                >
                  WhatsApp ile Talep Gonder
                </Button>

                {!canSubmit && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    Ad soyad, telefon ve tarih zorunludur. Yarım gun seciminde saat araligi da zorunludur.
                  </Typography>
                )}

                <Divider sx={{ my: 1.5 }} />

                <Stack spacing={0.6}>
                  <Typography variant="subtitle2" fontWeight={700}>
                    Notlar
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    - Fiyatlar bilgilendirme amaclidir.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    - Yogunluk durumuna gore tarih onayi degisebilir.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    - Kesin rezervasyon icin ekip onayi gerekir.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
