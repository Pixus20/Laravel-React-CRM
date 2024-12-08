<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Http;

// class TelegramBotController extends Controller
// {
//     public function setWebhook(Request $request)
//     {
//         // Ваш токен бота
//         $token = env('TELEGRAM_BOT_TOKEN');
        
//         // URL для вебхука (потрібно вказати адресу вашого серверу через ngrok або інший публічний сервер)
//         $webhookUrl = env('TELEGRAM_WEBHOOK_URL'); // Наприклад, https://bcb6-194-44-21-3.ngrok-free.app/api/telegram/webhook

//         // Формування URL запиту для Telegram API
//         $url = "https://api.telegram.org/bot{$token}/setWebhook";

//         // Виконання HTTP запиту для налаштування вебхука
//         $response = Http::post($url, [
//             'url' => $webhookUrl,
//         ]);

//         // Перевірка відповіді Telegram API
//         if ($response->successful()) {
//             return response()->json(['status' => 'Webhook set successfully']);
//         } else {
//             return response()->json(['error' => 'Failed to set webhook', 'details' => $response->body()], 500);
//         }
//     }
//     public function handleWebhook(Request $request)
//     {
//         $update = $request->all(); // отримуємо всі дані від Telegram
        
//         // Логіка для обробки запитів від Telegram (наприклад, перевірка на команду)
//         if (isset($update['message'])) {
//             $message = $update['message'];
//             // Можна обробити повідомлення, надіслати відповідь тощо
//             Log::info('Received message: ', $message);
//         }
//         return response()->json(['status' => 'Received']);
//     }
// }




namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Telegram\Bot\Api;
use App\Models\Task;

class TelegramBotController extends Controller
{
    // Метод для налаштування вебхука
    public function setWebhook(Request $request)
    {
        // Ваш токен бота
        $token = env('TELEGRAM_BOT_TOKEN');
        
        // URL для вебхука (потрібно вказати адресу вашого серверу через ngrok або інший публічний сервер)
        $webhookUrl = env('TELEGRAM_WEBHOOK_URL'); // Наприклад, https://bcb6-194-44-21-3.ngrok-free.app/api/telegram/webhook

        // Формування URL запиту для Telegram API
        $url = "https://api.telegram.org/bot{$token}/setWebhook";

        // Виконання POST запиту для налаштування вебхука
        $response = Http::post($url, [
            'url' => $webhookUrl,
        ]);

        // Перевірка відповіді Telegram API
        if ($response->successful()) {
            return response()->json(['status' => 'Webhook set successfully']);
        } else {
            return response()->json(['error' => 'Failed to set webhook', 'details' => $response->body()], 500);
        }
    }

    public function handleWebhook(Request $request)
    {
        // Ініціалізація Telegram API
        $telegram = new Api(env('TELEGRAM_BOT_TOKEN'));

        // Отримуємо запит від Telegram
        $update = $telegram->getWebhookUpdates();

        // Перевіряємо, чи є текстове повідомлення в оновленні
        if ($update->has('message')) {
            $message = $update->getMessage();
            $chatId = $message->getChat()->getId();
            $text = $message->getText();

            // Якщо користувач надіслав команду /tasks
            if ($text === '/tasks') {
                // Відправка простого повідомлення користувачу
                $responseText = "Це тестове повідомлення від вашого Telegram бота.";

                // Відправка відповіді користувачу
                $telegram->sendMessage([
                    'chat_id' => $chatId,
                    'text' => $responseText
                ]);
            } else {
                // Якщо команда інша
                $telegram->sendMessage([
                    'chat_id' => $chatId,
                    'text' => "Команда не розпізнана. Спробуйте /tasks."
                ]);
            }
        }

        return response()->json(['status' => 'Webhook received']);
    }
}
