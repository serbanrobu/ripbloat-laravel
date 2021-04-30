<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    @vite
</head>

<body class="antialiased">
    <div id="app" data-logged-in="{{ auth()->check() }}"></div>

    <div id="notifications" aria-live="assertive"
        class="z-50 space-y-2 fixed inset-0 flex flex-col items-center justify-end px-4 py-6 pointer-events-none sm:p-6 sm:items-end sm:justify-start">
    </div>
</body>

</html>
