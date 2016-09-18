---
---

$ ->
  $('.youtube').each ->
    width = 560
    height = 315
    $(@).append "<iframe width=\"#{width}\" height=\"#{height}\" src=\"https://www.youtube.com/embed/#{@id}\" frameborder=\"0\" allowfullscreen></iframe>"
