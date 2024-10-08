<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Sonika Accounting</title>
    <link rel="icon" href="{{ asset('favicon.png') }}" type="image/x-icon">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    @viteReactRefresh
    @vite(['resources/sass/app.scss', 'resources/js/App.tsx'])
    <script>
        window.config = @json($settings)
    </script>
</head>

<body>
    <div id="root"></div>
</body>

</html>