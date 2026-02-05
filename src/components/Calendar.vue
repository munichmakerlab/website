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
      url: 'https://tickets.munichmakerlab.de/mumalab/events/ical/?locale=de',
      format: 'ics'
    },
    {
      url: 'https://calendar.google.com/calendar/ical/lbd0aa2rluhecp7juvp35hd0k0%40group.calendar.google.com/public/basic.ics',
      format: 'ics'
    }
  ],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek'
  }
})
</script>