<template>
  <div class="calendar-container">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

const calendarOptions = ref({
  plugins: [dayGridPlugin, iCalendarPlugin],
  initialView: 'dayGridMonth',
  eventSources: [
{
      url: '/api/get-calendar?source=pretix',
      format: 'ics',
      color: '#3788d8',
      label: 'Workshops'
    },
    {
      url: '/api/get-calendar?source=events',
      format: 'ics',
      color: '#f89538ff',
      label: 'Open Events'
    }
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek'
  }
})
</script>